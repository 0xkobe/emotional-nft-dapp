import { animals, characters, skins } from '../data/nft'
import { Creature, Metadata, Skin, Traits } from '../types/metadata'
import { Character } from '../types/nft'

export const attribute = (metadata: Metadata, trait: Traits) => {
  if (!metadata) throw new Error(`Metadata is empty`)
  if (!metadata.attributes) throw new Error(`Attribute is empty`)
  const attr = metadata.attributes.find((x) => x.trait_type === trait)
  if (!attr) throw new Error(`Cannot find trait ${trait} in metadata`)
  return attr.value
}

export const getCreature = (
  animal: Creature,
  skin: Skin,
): Character | undefined => {
  const animalIndex = animals.findIndex((x) => x.name === animal)
  const skinIndex = skins.findIndex((x) => x.skin === skin)
  const id = animalIndex * skins.length + skinIndex
  return characters.find((x) => x.id === id)
}
