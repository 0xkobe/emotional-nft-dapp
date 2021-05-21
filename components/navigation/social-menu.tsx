import { Menu } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { FunctionComponent, HTMLAttributes } from 'react'

const social = [{ href: 'https://t.me/quiverprotocolchat', text: 'Telegram' }]

const SocialMenu: FunctionComponent<HTMLAttributes<any>> = (props) => (
  <Menu as="div" className="relative" {...props}>
    {({ open }) => (
      <>
        <Menu.Button className="inline-flex items-center px-4 py-2 text-sm font-medium my-3 rounded-xl hover:text-gray-700 hover:bg-gray-200 border">
          <DotsHorizontalIcon className="w-4 h-4" />
        </Menu.Button>

        {open && (
          <Menu.Items
            static
            className="origin-top-right absolute right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
        )}
      </>
    )}
  </Menu>
)

export default SocialMenu
