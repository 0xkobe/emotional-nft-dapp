import { Contract, ContractInterface } from '@ethersproject/contracts'
import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useCallback, useEffect, useState } from 'react'
import { providers } from '@0xsequence/multicall'
import { useWeb3React } from '@web3-react/core'
import { RawNFTDataArray } from '../types/raw'
import useNFTs from './useNFTs'

export default function useUserNFTs(
    connector: AbstractConnector,
    addresses: { [chainId: number]: string },
    abi: ContractInterface,
): {
    userNFTs: RawNFTDataArray
    error?: Error
} {
    const context = useWeb3React<Web3Provider>()
    const { account } = context
    const { totalNFTs, error } = useNFTs(connector, addresses, abi)

    const [userNFTs, setUserNFTs] = useState<RawNFTDataArray>([])

    useEffect(() => {
        if (totalNFTs.nfts.length) {
            const userNFTDataArray = totalNFTs.nfts.filter((_, index) => totalNFTs.owners[index] === account)
            setUserNFTs(userNFTDataArray)
        }
    }, [account, totalNFTs])

    return { userNFTs, error }
}
