import { useWeb3React } from '@web3-react/core'
import { FunctionComponent, HTMLAttributes, useEffect, useRef } from 'react'

const Jazzicon = require('@metamask/jazzicon')

const AccountImage: FunctionComponent<HTMLAttributes<any> & { size: number }> =
  (props) => {
    const ref = useRef<HTMLDivElement>()

    const { account } = useWeb3React()

    useEffect(() => {
      if (account && ref.current) {
        ref.current.innerHTML = ''
        ref.current.appendChild(
          Jazzicon(props.size, parseInt(account.slice(2, 10), 16)),
        )
      }
    }, [account, props.size])

    return <div ref={ref as any} {...props} />
  }

export default AccountImage
