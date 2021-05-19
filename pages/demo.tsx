import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useEffect, useState } from 'react'
import useContract from '../hooks/useContract'
import useWallet from '../hooks/useWallet'

export const connector = new InjectedConnector({})

const abi = require('../abi/QNFT.json')
const addresses = {
  3: '0x29D1B07a302d7CB8d3A78216495a80A86aA9593f',
}

export default function Demo() {
  const { library, chainId, account, activate, deactivate, active, error } =
    useWallet(connector)
  const { contract, error: contractError } = useContract(
    connector,
    addresses,
    abi,
  )

  const [balance, setBalance] = useState<BigNumber>()
  const [name, setName] = useState<string>()

  // get balance when account library or chain id change
  useEffect((): any => {
    if (!account) return
    if (!library) return
    void library.getBalance(account).then(setBalance)
    return () => setBalance(undefined)
  }, [account, library, chainId])

  // refresh contract name
  useEffect(() => {
    setName(undefined)
    if (!contract) return
    void contract.name().then(setName)
  }, [contract])

  return (
    <>
      <ul>
        <li>
          <strong>Chain id: </strong>
          <span>{chainId}</span>
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
          <strong>Contract's name: </strong>
          <span>{name}</span>
        </li>
      </ul>

      {!active && (
        <button
          className="px-2 py-1 rounded text-white bg-indigo-600"
          onClick={() => activate(connector)}
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
