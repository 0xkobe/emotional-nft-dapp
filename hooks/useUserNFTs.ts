import { ContractInterface } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { RawNFTData } from '../types/raw'
import useNFTs from './useNFTs'

export default function useUserNFTs(
  connector: AbstractConnector,
  addresses: { [chainId: number]: string },
  abi: ContractInterface,
): {
  nfts: RawNFTData[]
  isLoading: boolean
  error?: Error
} {
  const { account } = useWeb3React<Web3Provider>()
  const {
    nfts: allNFTs,
    owners,
    error,
    isLoading,
  } = useNFTs(connector, addresses, abi)

  const [nfts, setNFTs] = useState<RawNFTData[]>([])

  useEffect(() => {
    if (!allNFTs.length) return
    const userNFTDataArray = allNFTs.filter(
      (_, index) => owners[index] === account,
    )
    setNFTs(userNFTDataArray)
  }, [account, allNFTs])

  return { nfts, error, isLoading }
}
