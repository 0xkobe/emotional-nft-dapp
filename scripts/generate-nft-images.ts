require('dotenv').config()
import { existsSync } from 'fs'
import Jimp from 'jimp'
import { join } from 'path'
import { backgrounds, characters } from '../data/nft'
import { getNftImagePath } from '../lib/nft'
import { Emotion } from '../types/nft'

const main = async () => {
  for (const character of characters) {
    for (const background of backgrounds) {
      const emotions = Object.values(Emotion)
      for (const emotion of emotions) {
        const compositePath = join(
          'public',
          getNftImagePath(character, background, emotion),
        )

        // check if image already exist
        if (existsSync(compositePath)) {
          console.log(
            `Image for character ${character.id} with background ${background.id} and emotion ${emotion} already exists`,
          )
          continue
        }

        // load images
        const [backgroundImg, characterImg] = await Promise.all([
          Jimp.read(join(`public`, background.image)),
          Jimp.read(join('public', character.emotions[emotion])),
        ])

        // compose image
        const composite = backgroundImg.composite(characterImg, 0, 0)

        // write image
        await composite.writeAsync(compositePath)

        console.log(
          `Generated image for character ${character.id} with background ${background.id} and emotion ${emotion}`,
        )
      }
    }
  }
}

main().catch(console.error)
