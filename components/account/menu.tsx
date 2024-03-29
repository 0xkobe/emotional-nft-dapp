import { Menu } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'
import useWallet from '../../hooks/useWallet'
import { shortenAddress } from '../../lib/utils'
import SecondaryButton from '../button/secondary-button'
import AccountImage from './image'

const Account: FunctionComponent<HTMLAttributes<any>> = (props) => {
  const { account, deactivate } = useWallet()

  if (!account)
    return (
      <span className="inline-flex items-center px-3 py-2 text-xs font-medium leading-4 my-3 rounded-xl border text-purple-900 border-purple-100">
        <UserCircleIcon className="w-4 h-4" />
      </span>
    )

  return (
    <Menu as="div" className="relative inline-block" {...props}>
      {({ open }) => (
        <>
          <Menu.Button>
            <SecondaryButton className="inline-flex">
              <span className="hidden md:block mr-2">
                {shortenAddress(account)}
              </span>
              <AccountImage className="h-4 w-4" size={16} account={account} />
            </SecondaryButton>
          </Menu.Button>
          {open && (
            <Menu.Items
              static
              className="origin-top-right absolute z-50 right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={deactivate}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
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
