import { Contract, ContractInterface } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'
import { providers } from '@0xsequence/multicall'
import { BigNumber } from '@ethersproject/bignumber'

export type NFTData = {
    characterId: BigNumber
    bgImageId: BigNumber
    favCoinId: BigNumber
    lockDuration: BigNumber
    lockAmount: BigNumber
    defaultEmotionIndex: BigNumber
    createdAt: BigNumber
    withdrawn: boolean
    metaUrl: string
}
export type NFTDatas = NFTData[]

export default function useUserWallet(
    addresses: { [chainId: number]: string },
    abi: ContractInterface,
    account?: string,
    chainId?: number,
): {
    totalNFTs: NFTDatas
    myNFTs: NFTDatas
    error?: Error
} {
    const provider = new providers.MulticallProvider(new JsonRpcProvider("https://ropsten.infura.io/v3/8c13a2d22a304ff5955ca3c0d4c9d90e"))

    const [totalNFTs, setTotalNFTs] = useState<NFTDatas>([])
    const [myNFTs, setMyNFTs] = useState<NFTDatas>([])
    const [error, setError] = useState<Error>()

    const setNFTDatas = async (contract: Contract, account: string) => {
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
    }

    useEffect(() => {
        setError(undefined)
        if (!provider) return
        if (!account) return
        if (!chainId) return
        if (!(chainId in addresses)) {
            setError(new Error(`no contract for the network "${chainId}"`))
            return
        }
        const contract = new Contract(addresses[chainId], abi, provider)
        console.log(`Reload contract: ${contract.address}`)
        setNFTDatas(contract, account)

        return () => {
            setError(undefined)
        }
    }, [provider, addresses, abi])

    return { totalNFTs, myNFTs, error }
}
