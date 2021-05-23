import { Character } from "./nft"

export type CharacterOption = Character & {
  maxSupply: number
  currentSupply: number
}

export type BackgroundOption = {
  name: string
  image: string
}
