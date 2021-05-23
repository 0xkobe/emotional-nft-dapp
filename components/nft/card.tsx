import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react'
import { backgrounds } from '../../data/nft'
import { attribute, getCreature } from '../../lib/nft'
import { Creature, Metadata, Skin, Traits } from '../../types/metadata'
import { Character, FavCoin, Emotion } from '../../types/nft'
import IconUptrend from '../icon/uptrend'
import IconDownTrend from '../icon/downtrend'
import IconNormalTrend from '../icon/normaltrend'
import styles from './card.module.css'

export type IProps = HTMLAttributes<any> & {
  changePercentage: number // percentage of changes
  favcoin: FavCoin
  metadata: Metadata
  ethPrice: string
}

function trendIcon(changePercentage: number): any {
  if (changePercentage > 0) {
    return IconUptrend
  }
  if (changePercentage < 0) {
    return IconDownTrend
  }
  return IconNormalTrend
}

function trendClass(changePercentage: number): any {
  if (changePercentage > 0) {
    return styles.upTrend
  }
  if (changePercentage < 0) {
    return styles.downTrend
  }
  return styles.normalTrend
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function emotionFromPriceChange(changePercentage: number): Emotion {
  // temporarily we strictly define emotion as specified in https://github.com/Quiver-Protocol/emotional-nft-dapp/issues/8
  // angry	< -20%
  // worry	[-20%, -10%]
  // normal	[-10%, +15%]
  // rest	[+15%, +30%]
  // happy	>+30%
  if (changePercentage < -20) {
    return Emotion.Angry
  }
  if (changePercentage < -10) {
    return Emotion.Worry
  }
  if (changePercentage < 15) {
    return Emotion.Normal
  }
  if (changePercentage < 30) {
    return Emotion.Rest
  }
  return Emotion.Happy
}

const NFTCard: FunctionComponent<IProps> =
  ({ changePercentage, favcoin, ethPrice, metadata }: IProps) => {
    const [creature, setCreature] = useState<Character>()

    useEffect(() => {
      const animalId = attribute(metadata, Traits.Creature) as Creature
      const skinId = attribute(metadata, Traits.Skin) as Skin
      const creature = getCreature(animalId, skinId)
      if (!creature) return
      setCreature(creature)
    }, [metadata])

    if (!creature) return <div>not found</div>

    const TrendIcon = trendIcon(changePercentage)
    const backgroundSrc = backgrounds[attribute(metadata, Traits.Background) as number].image
    const emotion = emotionFromPriceChange(changePercentage)

    return (
      <div className={classNames('mb-auto p-8 border rounded-xl w-96', styles.card)}>
        <div className={styles.cardTop}>
          <div className={classNames(styles.emotionText, trendClass(changePercentage))}>{capitalizeFirstLetter(emotion)}</div>
          <div className={styles.favcoinVisual}>
            <TrendIcon className={styles.favcoinTrend} />
            <img className={styles.favcoinLogo} src={favcoin.meta.icon} />
          </div>
        </div>
        <div className={classNames('relative h-80 rounded overflow-hidden mx-auto', styles.cardBody)}>
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
        <div className={styles.cardBottom}>
          <div className={styles.creatureName}>{metadata.name}</div>
          <div className={styles.creatureInfo}>
            [{attribute(metadata, Traits.Skin)} -{' '}
            {attribute(metadata, Traits.Creature)}]
          </div>
          <div className={styles.ethPrice}>
            <img src="/favcoin/eth.svg" />
            <span>{ethPrice}</span>
          </div>
        </div>
      </div>
    )
  }

export default NFTCard
