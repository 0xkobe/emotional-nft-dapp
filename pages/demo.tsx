import { BigNumber } from '@ethersproject/bignumber'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useEffect, useState } from 'react'
import useContract from '../hooks/useContract'

export const connector = new InjectedConnector({})

const abi = require('../abi.json')
const addresses = {
  3: '0xbA6cB96fca05fD1819957c1C1dCfC2f50d12Bf0E',
}

export default function Demo() {
  const { library, chainId, account, activate, deactivate, active, error } =
    useWeb3React<Web3Provider>()
  const { contract, error: contractError } = useContract(addresses, abi)

  const [balance, setBalance] = useState<BigNumber>()
  const [blockNumber, setBlockNumber] = useState<number>()
  const [owner, setOwner] = useState<string>()

  // Activate wallet if already authorized
  useEffect((): any => {
    connector.isAuthorized().then((isAuthorized) => {
      if (!isAuthorized) return
      activate(connector, console.error, true)
    })
  }, [])

  // create and remove listeners when metamask changes
  useEffect((): any => {
    if (!library) return
    if (active) return
    if (error) return
    const handleConnect = () => activate(connector)
    const handleChainChanged = () => activate(connector)
    const handleNetworkChanged = () => activate(connector)
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length <= 0) return
      activate(connector)
    }

    library.on('connect', handleConnect)
    library.on('chainChanged', handleChainChanged)
    library.on('accountsChanged', handleAccountsChanged)
    library.on('networkChanged', handleNetworkChanged)

    return () => {
      library.removeListener('connect', handleConnect)
      library.removeListener('chainChanged', handleChainChanged)
      library.removeListener('accountsChanged', handleAccountsChanged)
      library.removeListener('networkChanged', handleNetworkChanged)
    }
  }, [library, active, error, activate])

  // get balance when account library or chain id change
  useEffect((): any => {
    if (!account) return
    if (!library) return
    library.getBalance(account).then(setBalance)
    return () => setBalance(undefined)
  }, [account, library, chainId])

  // Load and listen to blocks when the library or chain id changes
  useEffect((): any => {
    if (!library) return

    const updateBlockNumber = (blockNumber: number) => {
      setBlockNumber(blockNumber)
    }

    library.getBlockNumber().then(setBlockNumber)

    library.on('block', updateBlockNumber)

    return () => {
      setBlockNumber(undefined)
      library.removeListener('block', updateBlockNumber)
    }
  }, [library, chainId])

  useEffect(() => {
    setOwner(undefined)
    if (!contract) return
    contract.callStatic.owner().then(setOwner)
  }, [contract])

  return (
    <>
      <ul>
        <li>
          <strong>Chain id: </strong>
          <span>{chainId}</span>
        </li>
        <li>
          <strong>Block number: </strong>
          <span>{blockNumber}</span>
        </li>
        <li>
          <strong>Account: </strong>
          <span>{account}</span>
        </li>
        <li>
          <strong>Balance: </strong>
          <span>{balance && `Ξ${formatEther(balance)}`}</span>
        </li>
        <li>
          <strong>Contract: </strong>
          <span>
            {contract
              ? contract.address
              : contractError
              ? contractError.toString()
              : 'n/a'}
          </span>
        </li>
        <li>
          <strong>Contract's owner: </strong>
          <span>{owner}</span>
        </li>
      </ul>

      {!active && (
        <button
          className="px-2 py-1 rounded text-white bg-indigo-600"
          onClick={() => {
            activate(connector)
          }}
        >
          Connect Metamask
        </button>
      )}

      {active && (
        <button
          className="px-2 py-1 rounded text-indigo-600 border border-indigo-600"
          onClick={() => {
            deactivate()
          }}
        >
          Disconnect
        </button>
      )}

      {error && <h4>{error.toString()}</h4>}
    </>
  )
}
