import { ContractInterface } from '@ethersproject/contracts'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { fetchNFT } from '../lib/nft'
import { QNFT } from '../types/contracts'
import { NFT } from '../types/nft'
import useContract from './useContract'
import useWallet from './useWallet'

export default function useUserNFTs(
  addresses: { [chainId: number]: string },
  abi: ContractInterface,
): {
  nfts: NFT[]
  isLoading: boolean
  error?: Error
} {
  // TODO: activate multicall provider with web3
  //   const provider = new providers.MulticallProvider(
  //     new JsonRpcProvider(
  //       'https://ropsten.infura.io/v3/8c13a2d22a304ff5955ca3c0d4c9d90e',
  //     ),
  //   )
  const { contract: qnft } = useContract<QNFT>(addresses, abi)
  const { account } = useWallet()

  const [nfts, setNFTs] = useState<NFT[]>([])
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
          return fetchNFT(qnft, tokenId)
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
