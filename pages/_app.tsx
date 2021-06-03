import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Navigation from '../components/navigation/navigation'
import WalletGuard from '../components/wallet/guard'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  function getLibrary(provider: any): Web3Provider {
    return new Web3Provider(provider)
  }

  const { route } = useRouter()

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Navigation route={route} className="mb-4" />
      <div className="max-w-7xl mx-auto flex flex-col">
        <WalletGuard>
          <Component {...pageProps} />
        </WalletGuard>
      </div>
    </Web3ReactProvider>
  )
}

export default MyApp
