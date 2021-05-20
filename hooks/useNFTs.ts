import { Contract, ContractInterface } from '@ethersproject/contracts'
import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useCallback, useEffect, useState } from 'react'
import { providers } from '@0xsequence/multicall'
import { useWeb3React } from '@web3-react/core'
import { RawNFTDataArray, TotalRawNFTData } from '../types/raw'

export default function useNFTs(
    connector: AbstractConnector,
    addresses: { [chainId: number]: string },
    abi: ContractInterface,
): {
    totalNFTs: TotalRawNFTData
    error?: Error
} {
    const provider = new providers.MulticallProvider(new JsonRpcProvider("https://ropsten.infura.io/v3/8c13a2d22a304ff5955ca3c0d4c9d90e"))
    const context = useWeb3React<Web3Provider>()
    const { account, chainId, activate } = context

    const [totalNFTs, setTotalNFTs] = useState<TotalRawNFTData>({
        nfts: [],
        owners: []
    })
    const [error, setError] = useState<Error>()
    // Needed To prevent continuous refresh
    const [isLoading, setLoading] = useState<boolean>(true)

    // activate the connector on init
    useEffect(() => {
        void activate(connector, console.error, true)
    }, [activate, connector])

    const setNFTDataArray = useCallback(async (contract: Contract, account: string) => {
        const supply = (await contract.circulatingSupply()).toNumber()
        const requestNFTData = []
        const requestOwnerData = []
        for (let i = 1; i <= supply; i++) {
            requestNFTData.push(contract.nftData(i))
            requestOwnerData.push(contract.ownerOf(i))
        }
        const resNFTs: RawNFTDataArray = await Promise.all(requestNFTData)
        const resOwners: string[] = await Promise.all(requestOwnerData)
        setTotalNFTs({
            nfts: resNFTs,
            owners: resOwners
        })
    }, [])

    useEffect(() => {
        setError(undefined)
        if (!isLoading) return
        if (!provider) return
        if (!account) return
        if (!chainId) return
        if (!(chainId in addresses)) {
            setError(new Error(`no contract for the network "${chainId}"`))
            return
        }

        // Needed To prevent continuous refresh
        setLoading(false)
        const contract = new Contract(addresses[chainId], abi, provider)
        console.log(`Reload contract: ${contract.address}`)
        setNFTDataArray(contract, account)

        return () => {
            setError(undefined)
        }
    }, [provider, addresses, chainId, account])

    return { totalNFTs, error }
}
