import { Contract, ContractInterface } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'

export default function useContract<T extends Contract>(
  addresses: { [chainId: number]: string },
  abi: ContractInterface,
): {
  contract?: T
  error?: Error
} {
  const { library, chainId, error } = useWeb3React<Web3Provider>()
  const [contract, setContract] = useState<T>()

  // init the contract
  useEffect(() => {
    if (!library) return
    if (!chainId) return
    if (!(chainId in addresses)) {
      throw new Error(`no contract for the network "${chainId}"`)
    }
    const contract = new Contract(addresses[chainId], abi, library)
    setContract(contract as T)

    return () => {
      setContract(undefined)
    }
  }, [library, chainId, addresses, abi])

  return { contract, error }
}
