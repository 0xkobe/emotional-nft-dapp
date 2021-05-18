import { Contract, ContractInterface } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'

type State = {
  contract?: Contract
  error?: Error
}

export default function useContract(
  addresses: { [chainId: number]: string },
  abi: ContractInterface,
): State {
  const { library, chainId } = useWeb3React<Web3Provider>()

  const [contract, setContract] = useState<Contract>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    setError(undefined)
    if (!library) return
    if (!chainId) return
    if (!(chainId in addresses)) {
      setError(new Error(`no contract for the network "${chainId}"`))
      return
    }
    const contract = new Contract(addresses[chainId], abi, library)
    console.log(`Reload contract: ${contract.address}`)
    setContract(contract)

    return () => {
      setError(undefined)
      setContract(undefined)
    }
  }, [library, chainId, addresses, abi])

  return { contract, error }
}
