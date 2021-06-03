import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import Link from 'next/link'
import { FunctionComponent, HTMLAttributes } from 'react'
import AccountMenu from '../account/menu'
import SecondaryButton from '../button/secondary-button'
import SocialMenu from './social-menu'

export type IProps = HTMLAttributes<any> & {
  route?: string
}

const navigation = [
  { href: '/mint', text: 'Mint NFT' },
  { href: '/wallet', text: 'Investor Space' },
]

const Logo = () => (
  <Link href="/">
    <a className="flex-shrink-0 flex items-center">
      <img
        className="block lg:hidden h-8 w-auto"
        src="https://quiverprotocol.com/icon.svg"
        alt="Quiver"
      />
      <img
        className="hidden lg:block h-8 w-auto"
        src="/logo.svg"
        alt="Quiver"
      />
    </a>
  </Link>
)

const Navigation: FunctionComponent<IProps> = (props) => {
  return (
    <Disclosure as="nav" className="bg-white" {...props}>
      {({ open }) => (
        <div className="bg-white border-b border-purple-100">
          <div className="max-w-7xl mx-auto relative flex flex-col px-2 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-purple-400 hover:text-purple-500 hover:bg-purple-100 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-purple-500">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-center sm:justify-start">
                <Logo />
                <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
                  {navigation.map((x) => (
                    <SecondaryButton
                      key={x.href}
                      href={x.href}
                      link
                      shadow
                      active={x.href === props.route}
                    >
                      {x.text}
                    </SecondaryButton>
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
                        ? 'bg-purple-50 border-purple-500 text-purple-700'
                        : 'border-transparent text-purple-500 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700',
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
