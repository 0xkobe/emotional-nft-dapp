import classNames from 'classnames'
import React, { FunctionComponent, HTMLAttributes } from 'react'
import Input from '../input/input'
import TextArea from '../textarea/textarea'

export type IProps = HTMLAttributes<{}> & {
}

const StoryWizard: FunctionComponent<IProps> = ({ className, ...props }: IProps) => {
  return (
    <div className={classNames(className, "flex flex-col w-96 space-y-8")}>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">NFT name</div>
        <Input placeholder="Super Bitcoin Bear"/>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">Minter Name</div>
        <Input placeholder="px4.eth"/>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">NFT Description</div>
        <TextArea placeholder="The best bear in the universe to watch my Bitcoins"/>
      </div>
    </div>
  )
}

export default StoryWizard