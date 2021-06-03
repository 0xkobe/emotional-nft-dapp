import { Menu } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { FunctionComponent, HTMLAttributes } from 'react'
import SecondaryButton from '../button/secondary-button'

const social = [{ href: 'https://t.me/quiverprotocolchat', text: 'Telegram' }]

const SocialMenu: FunctionComponent<HTMLAttributes<any>> = (props) => (
  <Menu as="div" className="relative" {...props}>
    {({ open }) => (
      <>
        <Menu.Button>
          <SecondaryButton className="inline-flex">
            <DotsHorizontalIcon className="w-4 h-4" />
          </SecondaryButton>
        </Menu.Button>

        {open && (
          <Menu.Items
            static
            className="origin-top-right absolute z-50 right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {social.map((x) => (
              <Menu.Item key={x.href}>
                {() => (
                  <a
                    href={x.href}
                    key={x.href}
                    target="_blank"
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
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
