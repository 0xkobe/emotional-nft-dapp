import { Contract, ContractInterface } from '@ethersproject/contracts'
import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useCallback, useEffect, useState } from 'react'
import { providers } from '@0xsequence/multicall'
import { BigNumber } from '@ethersproject/bignumber'
import { useWeb3React } from '@web3-react/core'

export type NFTData = {
    characterId: BigNumber
    favCoinId: BigNumber
    lockDuration: BigNumber
    lockAmount: BigNumber
    createdAt: BigNumber
    withdrawn: boolean
    metaUrl: string
}
export type NFTDatas = NFTData[]

export type NFTCreator = {
    name: string
    address: string
    other: string
}

enum Emotion {
    Angry = 0,
    Worry,
    Normal,
    Rest,
    Happy,
}

export type NFTMeta = {
    name: string
    bgImageId: number
    defaultEmotion: Emotion
    color: string // NFT character color (skin)
    story: string // story that NFT minter want to put for the NFT
    creator: NFTCreator // nft creator info
}

export default function useUserWallet(
    connector: AbstractConnector,
    addresses: { [chainId: number]: string },
    abi: ContractInterface,
): {
    totalNFTs: NFTDatas
    myNFTs: NFTDatas
    error?: Error
} {
    const provider = new providers.MulticallProvider(new JsonRpcProvider("https://ropsten.infura.io/v3/8c13a2d22a304ff5955ca3c0d4c9d90e"))
    const context = useWeb3React<Web3Provider>()
    const { account, chainId, activate } = context

    const [totalNFTs, setTotalNFTs] = useState<NFTDatas>([])
    const [myNFTs, setMyNFTs] = useState<NFTDatas>([])
    const [error, setError] = useState<Error>()
    // Needed To prevent continuous refresh
    const [isLoading, setLoading] = useState<boolean>(true)

    // activate the connector on init
    useEffect(() => {
        void activate(connector, console.error, true)
    }, [activate, connector])

    const setNFTDatas = useCallback(async (contract: Contract, account: string) => {
        const supply = (await contract.circulatingSupply()).toNumber()
        const requestNFTData = []
        const requestOwnerData = []
        for (let i = 1; i <= supply; i++) {
            requestNFTData.push(contract.nftData(i))
            requestOwnerData.push(contract.ownerOf(i))
        }
        const resNFTs: NFTDatas = await Promise.all(requestNFTData)
        const resOwners: string[] = await Promise.all(requestOwnerData)
        setTotalNFTs(resNFTs)
        const myNFTDatas = resNFTs.filter((_, index) => resOwners[index] === account)
        setMyNFTs(myNFTDatas)
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
        setNFTDatas(contract, account)

        return () => {
            setError(undefined)
        }
    }, [provider])

    return { totalNFTs, myNFTs, error }
}
