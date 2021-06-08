import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'

export type IProps = HTMLAttributes<any> & {
  onTransfer: () => void
  onEdit: () => void
  onUpgrade: () => void
}

const NFTActions: FunctionComponent<IProps> = ({
  className,
  onTransfer,
}: IProps) => {
  return (
    <div
      className={classNames(
        className,
        'flex flex-col w-72 p-8 mb-auto bg-white -sm border border-purple-100 rounded-2xl',
      )}
    >
      <span className="text-base leading-6 font-bold text-purple-900 mb-8">
        NFT Actions
      </span>
      <div className="flex flex-col space-y-4">
        {/* TODO: implement button design correctly */}
        <span
          className="px-8 py-2 border border-gray-200 text-sm leading-5 font-medium text-gray-300 text-center rounded-lg  cursor-pointer"
          onClick={onTransfer}
        >
          Transfer
        </span>
        <span className="px-8 py-2 border border-gray-200 text-sm leading-5 font-medium text-gray-300 text-center rounded-lg cursor-not-allowed">
          Edition (coming soon)
        </span>
        <span className="px-8 py-2 border border-gray-200 text-sm leading-5 font-medium text-gray-300 text-center rounded-lg cursor-not-allowed">
          Upgrade (coming soon)
        </span>
      </div>
    </div>
  )
}

export default NFTActions
