import { Contract, ContractInterface } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'

export default function useContract<T extends Contract>(
  address: string,
  abi: ContractInterface,
): {
  contract?: T
} {
  const { library } = useWeb3React<Web3Provider>()
  const [contract, setContract] = useState<T>()

  useEffect(() => {
    if (!library) return
    const contract = new Contract(address, abi, library)
    setContract(contract as T)
    return () => {
      setContract(undefined)
    }
  }, [library, address, abi])

  return { contract }
}
