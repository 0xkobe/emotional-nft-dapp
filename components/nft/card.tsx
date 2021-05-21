import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react'
import { backgrounds } from '../../data/nft'
import { attribute, getCreature } from '../../lib/nft'
import { APINftMetadataResponse } from '../../types/api'
import { Creature, Skin, Traits } from '../../types/metadata'
import { Character } from '../../types/nft'

const NFTCard: FunctionComponent<HTMLAttributes<any> & { metadata: APINftMetadataResponse }> =
  (props) => {
    const [creature, setCreature] = useState<Character>()

    useEffect(() => {
      const animalId = attribute(props.metadata, Traits.Creature) as Creature
      const skinId = attribute(props.metadata, Traits.Skin) as Skin
      const creature = getCreature(animalId, skinId)
      if (!creature) return
      setCreature(creature)
    }, [props.metadata])

    if (!creature) return <div>not found</div>

    return (
      <div className="p-8 border rounded-xl w-96">
        <div className="relative h-80 rounded overflow-hidden mx-auto">
          <img
            src={
              backgrounds[
              attribute(props.metadata, Traits.Background) as number
              ]
            }
            className="absolute top-0 right-0 left-0 bottom-0"
          />
          <img
            src={(creature.emotions as { [key: string]: string })[attribute(props.metadata, Traits.DefaultEmotion)]}
            className="absolute top-0 right-0 left-0 bottom-0"
          />
        </div>
        <div>{props.metadata.name}</div>
        <div>
          [{attribute(props.metadata, Traits.Skin)} -{' '}
          {attribute(props.metadata, Traits.Creature)}]
        </div>
      </div>
    )
  }

export default NFTCard
