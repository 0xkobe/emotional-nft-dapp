import { FunctionComponent, HTMLAttributes, useEffect, useRef } from 'react'

const Jazzicon = require('@metamask/jazzicon')

export type IProps = HTMLAttributes<any> & {
  account: string
  size?: number
}

export const defaultSize = 32

const AccountImage: FunctionComponent<IProps> = (props) => {
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    if (props.account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(
        Jazzicon(
          props.size || defaultSize,
          parseInt(props.account.slice(2, 10), 16),
        ),
      )
    }
  }, [props.account, props.size])

  return <div ref={ref as any} {...props} />
}

export default AccountImage
