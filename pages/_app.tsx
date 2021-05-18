import { AppProps } from 'next/app'
import Navigation from '../components/navigation/navigation'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex items-stretch overflow-hidden">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  )
}

export default MyApp
