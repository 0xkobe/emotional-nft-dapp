import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import Head from 'next/head'
import Link from 'next/link'
import useUserWallet from '../hooks/useUserWallet'

export const connector = new InjectedConnector({})

import abiQNFT from '../abi/QNFT.json'
import { useEffect } from 'react'
const addresses = {
  3: '0xFA070e0161917f2C6efF9FFF05f2B3D0B40170e1',
}

export default function Wallet(): JSX.Element {
  const { library, chainId, activate, active, error } =
    useWeb3React<Web3Provider>()
  const { error: contractError } = useUserWallet(addresses, abiQNFT, chainId)
  console.log(123, contractError)

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

  return (
    <>
      <Head>
        <title>Wallet</title>
      </Head>

      <main>
        <ul>
          <li>
            <Link href="/nfts/1">NFT1</Link>
          </li>
          <li>
            <Link href="/nfts/2">NFT2</Link>
          </li>
          <li>
            <Link href="/nfts/3">NFT3</Link>
          </li>
        </ul>
      </main>
    </>
  )
}
