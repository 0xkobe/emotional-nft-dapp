import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuAlt1Icon, XIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import Link from 'next/link'
import { Fragment, FunctionComponent } from 'react'

const Navigation: FunctionComponent = () => {
  return (
    <Disclosure as="nav" className="flex-shrink-0 bg-primary-600">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              {/* Logo section */}
              <div className="flex items-center px-2 lg:px-0 xl:w-64">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-auto"
                    src="https://quiverprotocol.com/icon.svg"
                    alt="Quiver"
                  />
                </div>
              </div>

              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-primary-600 inline-flex items-center justify-center p-2 rounded-md text-primary-400 hover:text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuAlt1Icon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              {/* Links section */}
              <div className="hidden lg:block lg:w-80">
                <div className="flex items-center justify-end">
                  <div className="flex">
                    <div className="px-3 py-2 rounded-md text-sm font-medium text-primary-200 hover:text-white">
                      <Link href="/mint">Mint NFT</Link>
                    </div>
                  </div>
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-4 relative flex-shrink-0">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-primary-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                  )}
                                >
                                  <Link href="/wallet">My wallet</Link>
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                  )}
                                >
                                  <Link href="#">Logout</Link>
                                </div>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3">
              <div className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-800">
                <Link href="/mint">Mint NFT</Link>
              </div>
            </div>
            <div className="pt-4 pb-3 border-t border-primary-800">
              <div className="px-2">
                <div className="block px-3 py-2 rounded-md text-base font-medium text-primary-200 hover:text-primary-100 hover:bg-primary-600">
                  <Link href="/wallet">My wallet</Link>
                </div>
                <div className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-primary-200 hover:text-primary-100 hover:bg-primary-600">
                  <Link href="#">Logout</Link>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navigation
