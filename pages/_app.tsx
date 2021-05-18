import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { AppProps } from 'next/app'
import Navigation from '../components/navigation/navigation'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  function getLibrary(provider: any): Web3Provider {
    return new Web3Provider(provider)
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="relative min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex items-stretch overflow-hidden">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </Web3ReactProvider>
  )
}

export default MyApp
