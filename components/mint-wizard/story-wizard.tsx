import classNames from 'classnames'
import React, { FunctionComponent, HTMLAttributes } from 'react'
import Input from '../input/input'
import TextArea from '../textarea/textarea'

export type IProps = HTMLAttributes<{}> & {
  nftName: string
  minterName: string
  nftDescription: string
  onNftNameChange: (value: string) => void
  onMinterNameChange: (value: string) => void
  onNftDescriptionChange: (value: string) => void
}

const StoryWizard: FunctionComponent<IProps> = ({
  className, nftName, minterName, nftDescription, onNftNameChange, onMinterNameChange, onNftDescriptionChange, ...props 
}: IProps) => {

  return (
    <div className={classNames(className, "flex flex-col w-96 space-y-8")}>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">NFT name</div>
        <Input
          placeholder="Super Bitcoin Bear"
          value={nftName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onNftNameChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">Minter Name</div>
        <Input 
          placeholder="px4.eth"
          value={minterName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onMinterNameChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">NFT Description</div>
        <TextArea noResize 
          placeholder="The best bear in the universe to watch my Bitcoins"
          value={nftDescription}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onNftDescriptionChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default StoryWizard