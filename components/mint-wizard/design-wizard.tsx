import classNames from 'classnames'
import React, { FunctionComponent, HTMLAttributes, useMemo } from 'react'
import { backgrounds, skins, favCoins, characters, charactersSupply } from '../../data/nft'
import Select from '../select/select'
import CharacterView from '../gallery/character-view'
import BackgroundView from '../gallery/background-view'
import { QNFT, QNFTSettings } from '../../types/contracts'
import { Skin } from '../../types/metadata'

export type IProps = HTMLAttributes<{}> & {
  qnft?: QNFT
  qnftSettings?: QNFTSettings
  characterId: number
  setCharacterId: (index: number) => void
  skinIndex: number
  setSkinIndex: (index: number) => void
  coinIndex: number
  setCoinIndex: (index: number) => void
  backgroundIndex: number
  setBackgroundIndex: (index: number) => void
}

const DesignWizard: FunctionComponent<IProps> = ({ className, ...props }: IProps) => {
  const { qnft } = props

  const {
    characterId,
    skinIndex,
    coinIndex,
    backgroundIndex,
    setCharacterId,
    setSkinIndex,
    setCoinIndex,
    setBackgroundIndex
  } = props

  // const characterData = useMemo(() => {
  //   return qnft ? characters.filter(character => character.skin === skins[skinIndex].skin || character.skin === Skin.None).map(async (character) => {
  //     const currentSupply = (await qnft.nftCountByCharacter(character.id)).toNumber()
  //     return {
  //       ...character,
  //       maxSupply: charactersSupply[character.id],
  //       currentSupply
  //     }
  //   }) : []
  // }, [qnft, skinIndex])

  const characterData = useMemo(() => {
    if (!qnft) return []
    return characters.filter(character => character.skin === skins[skinIndex].skin || character.skin === Skin.None).map((character) => {
      // qnft.nftCountByCharacter(character.id)
      return {
        ...character,
        maxSupply: charactersSupply[character.id],
        currentSupply: 0
      }
    })
  }, [qnft, skinIndex])

  return (
    <div className={classNames(className, "flex flex-col space-y-8")}>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">Animal Set</div>
        <CharacterView
          characters={characterData}
          selectedCharacterId={characterId}
          onSelectOption={(index: number) => setCharacterId(index)}
        />
      </div>
      <div className="flex flex-row space-x-8">
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="text-base leading-6 font-medium text-gray-500">Animal Skine</div>
          <Select
            className="w-full"
            placeholder="Select skin"
            options={skins.map(val => ({ icon: val.icon, text: val.skin }))}
            selectedIndex={skinIndex}
            onSelectOption={(_, index: number) => setSkinIndex(index)}
          />
        </div>
        <div className="flex flex-col space-y-4 w-1/2">
          <div className="text-base leading-6 font-medium text-gray-500">Favorite Coin</div>
          <Select
            className="w-full"
            placeholder="Select a coin"
            options={favCoins.map(val => ({ icon: val.meta.icon, text: val.meta.name }))}
            selectedIndex={coinIndex}
            onSelectOption={(_, index: number) => setCoinIndex(index)}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-base leading-6 font-medium text-gray-500">Background</div>
        <BackgroundView
          backgrounds={backgrounds}
          selectedIndex={backgroundIndex}
          onSelectOption={(index: number) => setBackgroundIndex(index)}
        />
      </div>
    </div>
  )
}

export default DesignWizard