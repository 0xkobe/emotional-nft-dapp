import { Menu } from '@headlessui/react'
import { InjectedConnector } from '@web3-react/injected-connector'
import classNames from 'classnames'
import { FunctionComponent, HtmlHTMLAttributes } from 'react'
import useWallet from '../../hooks/useWallet'
import { shortenAddress } from '../../lib/utils'
import AccountImage from './image'

const connector = new InjectedConnector({})

const Account: FunctionComponent<HtmlHTMLAttributes<any>> = (props) => {
  const { account, activate, deactivate } = useWallet(connector)

  if (!account)
    return (
      <a
        onClick={() => activate(connector)}
        className="inline-flex items-center px-4 py-2 text-sm font-medium my-3 rounded-xl  hover:text-gray-700 hover:bg-gray-200 border"
      >
        Connect wallet
      </a>
    )

  return (
    <Menu as="div" className="relative inline-block" {...props}>
      {({ open }) => (
        <>
          <Menu.Button className="inline-flex items-center px-4 py-2 text-sm font-medium my-3 rounded-xl  hover:text-gray-700 hover:bg-gray-200 border">
            <span className="hidden md:block mr-2">
              {shortenAddress(account)}
            </span>
            <AccountImage className="h-4 w-4" size={16} account={account} />
          </Menu.Button>
          {open && (
            <Menu.Items
              static
              className="origin-top-right absolute right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={deactivate}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    )}
                  >
                    Sign out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          )}
        </>
      )}
    </Menu>
  )
}

export default Account
