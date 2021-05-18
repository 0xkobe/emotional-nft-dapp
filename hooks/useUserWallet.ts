import { Contract, ContractInterface } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'
import { providers } from '@0xsequence/multicall'
import { parseNumber } from './utils'

type State = {
    error?: Error
}

export default function useUserWallet(
    addresses: { [chainId: number]: string },
    abi: ContractInterface,
    chainId?: number,
): State {
    const provider = new providers.MulticallProvider(new JsonRpcProvider("https://ropsten.infura.io/v3/8c13a2d22a304ff5955ca3c0d4c9d90e"))

    //   const [contract, setContract] = useState<Contract>()
    const [error, setError] = useState<Error>()

    const getAllNFTs = async (contract: Contract) => {
        const supply = parseNumber(await contract.circulatingSupply())
        console.log("supply: ", supply)
        const request = []
        for (let i = 1; i <= supply; i++) {
            request.push(contract.nftData(i))
        }
        const res = await Promise.all(request)
        console.log(res)
    }

    useEffect(() => {
        setError(undefined)
        if (!provider) return
        if (!chainId) return
        if (!(chainId in addresses)) {
            setError(new Error(`no contract for the network "${chainId}"`))
            return
        }
        const contract = new Contract(addresses[chainId], abi, provider)
        console.log(`Reload contract: ${contract.address}`)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        getAllNFTs(contract)

        return () => {
            setError(undefined)
        }
    }, [provider, addresses, abi])

    return { error }
}
