import { ContractInterface } from '@ethersproject/contracts'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { nftBaseURL } from '../data/nft'
import { APINftMetadataResponse, APIResponseError } from '../types/api'
import { QNFT } from '../types/contracts'
import { NFTData } from '../types/nft'
import useContract from './useContract'

export default function useUserNFTs(
  connector: AbstractConnector,
  addresses: { [chainId: number]: string },
  abi: ContractInterface,
): {
  nfts: NFTData[]
  isLoading: boolean
  error?: Error
} {
  // TODO: activate multicall provider with web3
  //   const provider = new providers.MulticallProvider(
  //     new JsonRpcProvider(
  //       'https://ropsten.infura.io/v3/8c13a2d22a304ff5955ca3c0d4c9d90e',
  //     ),
  //   )
  const { contract, account } = useContract<QNFT>(connector, addresses, abi)

  const [nfts, setNFTs] = useState<NFTData[]>([])
  const [error, setError] = useState<Error>()
  const [isLoading, setLoading] = useState<boolean>(false)

  const setUserNFTs = async (contract: QNFT, account: string) => {
    setLoading(true)
    try {
      const userNFTCount = (
        await contract.callStatic.balanceOf(account)
      ).toNumber()

      const requestTokenIds = []
      for (let i = 0; i < userNFTCount; i++) {
        requestTokenIds.push(
          contract.callStatic.tokenOfOwnerByIndex(account, i),
        )
      }
      const resTokenIds: BigNumber[] = await Promise.all(requestTokenIds)
      // const requestNFTs = []
      const requestTokenURIs = []
      for (let i = 0; i < userNFTCount; i++) {
        // requestNFTs.push(
        //   contract.callStatic.nftData(resTokenIds[i]).then(
        //     (x): RawNFTData => ({
        //       id: i,
        //       characterId: x.characterId,
        //       favCoinId: x.favCoinId,
        //       lockDuration: x.lockDuration,
        //       lockAmount: x.lockAmount,
        //       createdAt: x.createdAt,
        //       withdrawn: x.withdrawn,
        //       metaId: x.metaId,
        //     }),
        //   ),
        // )
        requestTokenURIs.push(
          contract.tokenURI(resTokenIds[i])
        )
      }
      // const resRawNFTs: RawNFTData[] = await Promise.all(requestNFTs)
      const resTokenURIs: string[] = await Promise.all(requestTokenURIs)
      const resNFTs = await Promise.all(resTokenURIs.map(async (tokenURI, index) => {
        const newTokenURI = process.env.NEXT_API_URL ? tokenURI.replace(nftBaseURL, process.env.NEXT_API_URL) : tokenURI
        const res = await fetch(newTokenURI)
        const response: APINftMetadataResponse | APIResponseError =
          await res.json()
        if ('error' in response)
          throw new Error(`an error occurred while fetching metadata`)
        if (!res.ok)
          throw new Error(`an unknown error occurred while fetching metadata`)
        return {
          id: index,
          metadata: response
        }
      }))
      setNFTs(resNFTs)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setError(undefined)
    if (!contract) return
    if (!account) return

    void setUserNFTs(contract, account)

    return () => {
      setError(undefined)
    }
  }, [contract, account])

  return { nfts, error, isLoading }
}
