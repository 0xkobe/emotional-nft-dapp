import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'
import PropertyView, { Property } from './property-view'

export type IProps = HTMLAttributes<{}> & {
  properties: Property[]
  characterPrice: string
  favcoinPrice: string
  tokenPrice: string
  mintPrice: string
}

const MintSummary: FunctionComponent<IProps> = ({
  properties,
  characterPrice,
  favcoinPrice,
  tokenPrice,
  mintPrice,
  className,
  children,
}: IProps) => {
  return (
    <div
      className={classNames(
        className,
        'bg-white shadow-sm border border-purple-100 p-4 rounded-2xl',
      )}
    >
      <div className="p-4">
        <div className="text-base leading-6 font-bold text-purple-900 mb-8">
          Mint Summary
        </div>
        {properties.map((property) => {
          return <PropertyView key={property.title} value={property} />
        })}
        <div className="mt-4 text-sm leading-5 font-medium text-purple-900 mb-2">
          NFT Mint Price
        </div>
        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="text-xs leading-4 text-gray-500">
            Character Price
          </div>
          <div className="text-xs leading-4 font-bold text-gray-500 text-right">
            {characterPrice}
          </div>
          <div className="text-xs leading-4 text-gray-500">
            Favcoin Price
          </div>
          <div className="text-xs leading-4 font-bold text-gray-500 text-right">
            {favcoinPrice}
          </div>
          <div className="text-xs leading-4 text-gray-500">
            Token Price
          </div>
          <div className="text-xs leading-4 font-bold text-gray-500 text-right">
            {tokenPrice}
          </div>
          <div className="text-sm leading-5 font-semibold text-purple-900">
            Total
          </div>
          <div className="text-sm leading-5 font-semibold text-purple-700 text-right">
            {mintPrice}
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default MintSummary
