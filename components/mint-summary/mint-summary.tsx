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
          return (
            <PropertyView
              key={property.title}
              value={property}
              className="mt-4"
            />
          )
        })}
      </div>
      <div className="mt-4 rounded-2xl bg-purple-50 p-4">
        <PropertyView
          value={{
            title: 'NFT Mint Price',
            keyValues: [
              { key: 'Character', value: characterPrice },
              { key: 'Favcoin', value: favcoinPrice },
              { key: 'Token', value: tokenPrice },
            ],
          }}
        />
        <div className="grid grid-cols-2 gap-2 mb-4">
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
