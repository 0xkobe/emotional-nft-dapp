import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Banner from '../components/navigation/banner'
import Navigation from '../components/navigation/navigation'
import WalletGuard from '../components/wallet/guard'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  function getLibrary(provider: any): Web3Provider {
    return new Web3Provider(provider)
  }

  const { route } = useRouter()
  const [banner, setBanner] = useState(true)

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {banner && <Banner close={() => setBanner(false)} />}
      <Navigation route={route} className="mb-4" />
      <div className="max-w-7xl mx-auto relative min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex items-stretch overflow-hidden">
            <WalletGuard>
              <Component {...pageProps} />
            </WalletGuard>
          </div>
        </div>
      </div>
    </Web3ReactProvider>
  )
}

export default MyApp
