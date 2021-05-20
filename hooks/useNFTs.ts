import { Contract, ContractInterface } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { RawNFTData } from '../types/raw'
import useContract from './useContract'

export default function useNFTs(
  connector: AbstractConnector,
  addresses: { [chainId: number]: string },
  abi: ContractInterface,
): {
  nfts: RawNFTData[]
  owners: string[]
  isLoading: boolean
  error?: Error
} {
  // TODO: activate multicall provider with web3
  //   const provider = new providers.MulticallProvider(
  //     new JsonRpcProvider(
  //       'https://ropsten.infura.io/v3/8c13a2d22a304ff5955ca3c0d4c9d90e',
  //     ),
  //   )
  const { activate } = useWeb3React<Web3Provider>()
  const { contract } = useContract(connector, addresses, abi)

  const [nfts, setNFts] = useState<RawNFTData[]>([])
  const [owners, setOwners] = useState<string[]>([])
  const [error, setError] = useState<Error>()
  const [isLoading, setLoading] = useState<boolean>(false)

  // activate the connector on init
  useEffect(() => {
    void activate(connector, console.error, true)
  }, [activate, connector])

  const setNFTDataArray = useCallback(async (contract: Contract) => {
    setError(undefined)
    setLoading(true)
    try {
      const supply = (await contract.circulatingSupply()).toNumber()
      const requestNFTData = []
      const requestOwnerData = []
      for (let i = 1; i <= supply; i++) {
        requestNFTData.push(
          contract.nftData(i).then((x: any) => ({ ...x, id: i })),
        )
        requestOwnerData.push(contract.ownerOf(i))
      }
      const resNFTs: RawNFTData[] = await Promise.all(requestNFTData)
      const resOwners: string[] = await Promise.all(requestOwnerData)
      setNFts(resNFTs)
      setOwners(resOwners)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setError(undefined)
    if (!contract) return

    void setNFTDataArray(contract)

    return () => {
      setError(undefined)
    }
  }, [contract])

  return { nfts, owners, error, isLoading }
}
