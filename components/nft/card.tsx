import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react'
import { backgrounds } from '../../data/nft'
import { attribute, getCreature } from '../../lib/nft'
import { Creature, Metadata, Skin, Traits } from '../../types/metadata'
import { Character, FavCoin, Emotion } from '../../types/nft'
import IconUptrend from '../icon/uptrend'
import IconDownTrend from '../icon/downtrend'
import IconNormalTrend from '../icon/normaltrend'
import './card.css'

export type IProps = HTMLAttributes<any> & {
  changePercentage: number // percentage of changes
  emotion: Emotion
  favcoin: FavCoin
  metadata: Metadata
  ethPrice: string
}

function trendIcon(trendValue: number): any {
  if (trendValue > 0) {
    return IconUptrend
  }
  if (trendValue < 0) {
    return IconDownTrend
  }
  return IconNormalTrend
}

function trendClass(trendValue: number): any {
  if (trendValue > 0) {
    return 'uptrend'
  }
  if (trendValue < 0) {
    return 'downtrend'
  }
  return 'normaltrend'
}

const NFTCard: FunctionComponent<IProps> =
  ({ emotion, changePercentage, favcoin, ethPrice, metadata }: IProps) => {
    const [creature, setCreature] = useState<Character>()

    useEffect(() => {
      const animalId = attribute(metadata, Traits.Creature) as Creature
      const skinId = attribute(metadata, Traits.Skin) as Skin
      const creature = getCreature(animalId, skinId)
      if (!creature) return
      setCreature(creature)
    }, [metadata])

    if (!creature) return <div>not found</div>

    let TrendIcon = trendIcon(changePercentage)
    let backgroundSrc = backgrounds[attribute(metadata, Traits.Background) as number]

    return (
      <div className="p-8 border rounded-xl w-96">
        <div className="card-top">
          <div className={classNames('emotion-text', trendClass(changePercentage))}>{emotion}</div>
          <div className="favcoin-visual">
            <TrendIcon className="favcoin-trend" />
            <img className="favcoin-logo" src={favcoin.meta.icon} />
          </div>
        </div>
        <div className="relative h-80 rounded overflow-hidden mx-auto card-body">
          {
            backgroundSrc && (
              <img
                src={backgroundSrc}
                className="absolute top-0 right-0 left-0 bottom-0"
              />
            )
          }
          <img
            src={creature.emotions[emotion]}
            className="absolute top-0 right-0 left-0 bottom-0"
          />
        </div>
        <div className="card-bottom">
          <div className="creature-name">{metadata.name}</div>
          <div className="creature-info">
            [{attribute(metadata, Traits.Skin)} -{' '}
            {attribute(metadata, Traits.Creature)}]
          </div>
          <div className="eth-price">
            <img src="/favcoin/eth.svg" />
            <span>{ethPrice}</span>
          </div>
        </div>
      </div>
    )
  }

export default NFTCard
