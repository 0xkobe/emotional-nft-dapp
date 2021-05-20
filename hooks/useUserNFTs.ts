import { ContractInterface } from '@ethersproject/contracts'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { BigNumber, Contract } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { RawNFTData } from '../types/raw'
import useContract from './useContract'

export default function useUserNFTs(
    connector: AbstractConnector,
    addresses: { [chainId: number]: string },
    abi: ContractInterface,
): {
    nfts: RawNFTData[]
    isLoading: boolean
    error?: Error
} {
    // TODO: activate multicall provider with web3
    //   const provider = new providers.MulticallProvider(
    //     new JsonRpcProvider(
    //       'https://ropsten.infura.io/v3/8c13a2d22a304ff5955ca3c0d4c9d90e',
    //     ),
    //   )
    const { contract, account } = useContract(connector, addresses, abi)

    const [nfts, setNFTs] = useState<RawNFTData[]>([])
    const [error, setError] = useState<Error>()
    const [isLoading, setLoading] = useState<boolean>(false)

    const setUserNFTs = async (contract: Contract, account: string) => {
        setLoading(true)
        try {
            const userNFTCount = (await contract.balanceOf(account)).toNumber()
            const requestTokenIds = []
            for (let i = 0; i < userNFTCount; i++) {
                requestTokenIds.push(contract.tokenOfOwnerByIndex(i))
            }
            const resTokenIds: BigNumber[] = await Promise.all(requestTokenIds)
            const requestNFTs = []
            for (let i = 0; i < userNFTCount; i++) {
                requestNFTs.push(contract.nftData(resTokenIds[i]).then((x: any) => ({ ...x, id: i })))
            }
            const resNFTs: RawNFTData[] = await Promise.all(requestNFTs)
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
