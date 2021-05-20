import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const social = [{ href: 'https://t.me/quiverprotocolchat', text: 'Telegram' }]

const SocialMenu = () => (
  <Menu as="div" className="ml-3 relative">
    {({ open }) => (
      <>
        <div>
          <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
            ...
          </Menu.Button>
        </div>
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
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {social.map((x) => (
              <Menu.Item key={x.href}>
                {() => (
                  <a
                    href={x.href}
                    key={x.href}
                    target="_blank"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    {x.text}
                  </a>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </>
    )}
  </Menu>
)

export default SocialMenu
