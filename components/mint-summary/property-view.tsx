import { FunctionComponent, HTMLAttributes } from 'react'

export type KeyValue = {
  key: string
  value: string
}

export type Property = {
  title: string
  keyValues: KeyValue[]
}

export type IProps = HTMLAttributes<{}> & {
  value: Property
}

const PropertyView: FunctionComponent<IProps> = ({ value }: IProps) => {
  // TODO: Mint summary description to 1 line with ellipsis
  // since there are few fields that are long that could break whole style,
  // we need to make everything to not overflow specific number of letters in short description
  // and reduce them into ellipsis
  return (
    <>
      <div className="text-sm leading-5 font-medium text-purple-900 mb-2 mt-4">
        {value.title}
      </div>
      {value.keyValues.map((keyValue) => {
        return (
          <div key={keyValue.key} className="grid grid-cols-2 gap-2 mb-1">
            <div className="text-xs leading-4 font-normal text-gray-500">
              {keyValue.key}
            </div>
            <div className="text-xs leading-4 font-medium text-gray-500 overflow-ellipsis overflow-hidden text-right">
              {keyValue.value}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default PropertyView
