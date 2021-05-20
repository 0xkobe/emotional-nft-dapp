import { Menu, Transition } from '@headlessui/react'
import { InjectedConnector } from '@web3-react/injected-connector'
import classNames from 'classnames'
import { Fragment, FunctionComponent, useEffect } from 'react'
import useWallet from '../../hooks/useWallet'
import AccountImage from './image'

export const connector = new InjectedConnector({})

const Account: FunctionComponent = () => {
  const { account, activate, deactivate } = useWallet(connector)

  useEffect(() => {
    activate(connector)
  }, [])

  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          {!account && (
            <a
              onClick={() => activate(connector)}
              className="bg-white flex text-xs leading-4 font-normal border rounded-xl px-3 py-2 focus:outline-none"
            >
              Connect wallet
            </a>
          )}
          {account && (
            <Menu.Button className="bg-white flex text-xs leading-4 font-normal border rounded-xl px-3 py-2 focus:outline-none">
              {account}
              <AccountImage className="h-4 w-4 ml-2" size={16} />
            </Menu.Button>
          )}
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white focus:outline-none"
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
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default Account
