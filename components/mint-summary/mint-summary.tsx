import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes } from 'react'
import PropertyView, { Property } from './property-view'

export type IProps = HTMLAttributes<{}> & {
  title: string
  properties: Property[]
  prices: Property
  totalPrice: string
}

const MintSummary: FunctionComponent<IProps> = ({
  title,
  properties,
  prices,
  totalPrice,
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
          {title}
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
        <PropertyView value={prices} />
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-sm leading-5 font-semibold text-purple-900">
            Total
          </div>
          <div className="text-sm leading-5 font-semibold text-purple-700 text-right">
            {totalPrice}
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default MintSummary
