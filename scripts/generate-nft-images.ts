import { existsSync } from 'fs'
import Jimp from 'jimp'
import { join } from 'path'
import { backgrounds, characters } from '../data/nft'

const main = async () => {
  for (const character of characters) {
    for (const background of backgrounds) {
      const compositePath = join(
        'public',
        'nft',
        'composite',
        `${character.name.toLowerCase()}-${character.skin.toLowerCase()}-${background.name
          .toLowerCase()
          .replace(/ /g, '_')}.png`,
      )

      // check if image already exist
      if (existsSync(compositePath)) {
        console.log(
          `Image for character ${character.id} and background ${background.id} already exists`,
        )
        continue
      }

      // load images
      const [backgroundImg, characterImg] = await Promise.all([
        Jimp.read(join(`public`, background.image)),
        Jimp.read(join('public', character.emotions.normal)),
      ])

      // compose image
      const composite = backgroundImg.composite(characterImg, 0, 0)

      // write image
      await composite.writeAsync(compositePath)

      console.log(
        `Generated image for character ${character.id} and background ${background.id}`,
      )
    }
  }
}

main().catch(console.error)
