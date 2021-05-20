import { Contract, ContractInterface } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { useEffect, useState } from 'react'

export default function useContract<T extends Contract>(
  connector: AbstractConnector,
  addresses: { [chainId: number]: string },
  abi: ContractInterface,
): Web3ReactContextInterface<Web3Provider> & {
  contract?: T
  error?: Error
} {
  // should this context be injected?
  const context = useWeb3React<Web3Provider>()
  const { library, chainId, activate } = context

  const [contract, setContract] = useState<T>()
  const [error, setError] = useState<Error>()

  // activate the connector on init
  // TODO: maybe this can be moved outside of this hook to give more flexibility to the page
  useEffect(() => {
    void activate(connector, console.error, true)
  }, [activate, connector])

  // init the contract
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
    setContract(contract as T)

    return () => {
      setError(undefined)
      setContract(undefined)
    }
  }, [library, chainId, addresses, abi])

  return { ...context, contract, error }
}
