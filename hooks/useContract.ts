import { providers } from '@0xsequence/multicall'
import { Contract, ContractInterface } from '@ethersproject/contracts'
import { providers as ethersProviders } from 'ethers'
import { useEffect, useState } from 'react'
import { chain } from '../data/chains'

const provider = new providers.MulticallProvider(
  new ethersProviders.StaticJsonRpcProvider(chain.remoteProvider),
)

export default function useContract<T extends Contract>(
  address: string,
  abi: ContractInterface,
): {
  contract?: T
} {
  const [contract, setContract] = useState<T>()

  useEffect(() => {
    setContract(new Contract(address, abi, provider) as T)
  }, [])

  return { contract }
}
