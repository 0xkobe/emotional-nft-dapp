import { ContractInterface } from '@ethersproject/contracts'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useEffect, useState } from 'react'
import { fetchMetadata } from '../lib/nft'
import { QNFT } from '../types/contracts'
import { Metadata } from '../types/nft'
import useContract from './useContract'

export default function useUserNFTs(
  connector: AbstractConnector,
  addresses: { [chainId: number]: string },
  abi: ContractInterface,
): {
  nfts: Metadata[]
  isLoading: boolean
  error?: Error
} {
  const { contract: qnft, account } = useContract<QNFT>( // FIXME: should not use account from useContract
    connector,
    addresses,
    abi,
  )

  const [nfts, setNFTs] = useState<Metadata[]>([])
  const [error, setError] = useState<Error>()
  const [isLoading, setLoading] = useState<boolean>(false)

  const setUserNFTs = async (qnft: QNFT, account: string) => {
    setLoading(true)
    try {
      const userNFTCount = await qnft.balanceOf(account)
      const userNFTIndex = Array.from(Array(userNFTCount.toNumber()).keys())
      const nfts = await Promise.all(
        userNFTIndex.map(async (index) => {
          const tokenId = await qnft.tokenOfOwnerByIndex(account, index)
          return fetchMetadata(qnft, tokenId)
        }),
      )
      setNFTs(nfts)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setError(undefined)
    if (!qnft) return
    if (!account) return

    void setUserNFTs(qnft, account)

    return () => {
      setError(undefined)
    }
  }, [qnft, account])

  return { nfts, error, isLoading }
}
