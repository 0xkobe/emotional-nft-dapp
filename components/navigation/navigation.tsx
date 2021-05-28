import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import Link from 'next/link'
import { FunctionComponent, HTMLAttributes } from 'react'
import AccountMenu from '../account/menu'
import SocialMenu from './social-menu'

export type IProps = HTMLAttributes<any> & {
  route?: string
}

const navigation = [
  { href: '/mint', text: 'Mint NFT' },
  { href: '/wallet', text: 'Investor Space' },
]

const Logo = () => (
  <a href="/" className="flex-shrink-0 flex items-center">
    <img
      className="block lg:hidden h-8 w-auto"
      src="https://quiverprotocol.com/icon.svg"
      alt="Quiver"
    />
    <img className="hidden lg:block h-8 w-auto" src="/logo.svg" alt="Quiver" />
  </a>
)

const Navigation: FunctionComponent<IProps> = (props) => {
  return (
    <Disclosure as="nav" className="bg-white" {...props}>
      {({ open }) => (
        <div className="bg-white border-b border-purple-100">
          <div className="max-w-7xl mx-auto relative flex flex-col px-2 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Logo />
                <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
                  {navigation.map((x) => (
                    <Link key={x.href} href={x.href}>
                      <a
                        className={classNames(
                          'inline-flex items-center px-3 py-2 text-xs font-medium leading-4 my-3 rounded-xl border hover:text-purple-700 hover:border-purple-700 hover:bg-purple-50 hover:shadow',
                          x.href === props.route
                            ? 'text-purple-700 border-purple-700 bg-purple-50 shadow'
                            : 'text-purple-900 border-purple-100',
                        )}
                      >
                        {x.text}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <AccountMenu />
                <SocialMenu className="ml-3" />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-4 space-y-1">
              {navigation.map((x) => (
                <Link key={x.href} href={x.href}>
                  <a
                    className={classNames(
                      'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                      x.href === props.route
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700',
                    )}
                  >
                    {x.text}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}

export default Navigation
