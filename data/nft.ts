type Artist = {
  name: string
  wallet: string
  meta: string
}

type Character = {
  name: string
  skin?: string
  emotions: {
    angry: string
    worry: string
    normal: string
    rest: string
    happy: string
  }
  artist: Artist
}

const backgrounds = [
  'nft/background/01_sunrise_boat.png',
  'nft/background/05_bright_night_sky_moon.png',
  'nft/background/07_no_cloud_night_sky.png',
  'nft/background/03_evening_boat.png',
  'nft/background/06_cloudy_night_sky.png',
  'nft/background/04_night_boat.png',
  'nft/background/08_rainy_night_sky.png',
  'nft/background/02_noon_boat.png',
]

const artists: { [key: string]: Artist } = {
  clive: {
    name: 'Clive Almeida',
    wallet: '0x74f1bE0eD391e59c70d93cA6C79eA5c57a83604C',
    meta: `artstation.com/clive_almeida`,
  },
  rogan: {
    name: 'Rogan X',
    wallet: '0x2Ffa60A14Dd2eb156d64390D545B819e40fC87F2 (roganx.eth)',
    meta: `https://omnil.ink/roganx`,
  },
  keili: {
    name: 'Keili Major Artist',
    wallet: 'majorart.eth',
    meta: `https://linktr.ee/majorart`,
  },
  jatin: {
    name: 'Jatin Pathi',
    wallet: '0x300da191248a500b2174aeD992d6697BF97F9139',
    meta: `https://jatinpathi.com/; https://www.artstation.com/forever_3vil`,
  },
  mehak: {
    name: 'Mehak Jain',
    wallet: '0x4147948b11ce851082f85fd7b56b76ae3a583560',
    meta: `https://tryshowtime.com/MehakJain`,
  },
  debbie: {
    name: 'Debbie H Digitial',
    wallet: '0xb2225441D8b19Ef1FA914C46099ff550aa3454a9',
    meta: `https://linktr.ee/debbiehdigital; https://twitter.com/DebbieHdigital`,
  },
}

const skins = ['Diamond', 'Bronze', 'Silver', 'Golden', 'Platinium']
const animals = [
  { name: 'Bull', artist: artists.clive },
  { name: 'Bear', artist: artists.rogan },
  { name: 'Whale', artist: artists.keili },
  { name: 'Dragon', artist: artists.jatin },
  { name: 'Deer', artist: artists.mehak },
]

const characters: Character[] = []
for (const animal of animals) {
  for (const skin of skins) {
    const baseUrl = `/nft/characters/${animal.name.toLowerCase()}/${skin.toLowerCase()}`
    characters.push({
      name: `${skin} ${animal.name}`,
      artist: animal.artist,
      skin: skin.toLowerCase(),
      emotions: {
        angry: `${baseUrl}/angry.png`,
        worry: `${baseUrl}/worry.png`,
        normal: `${baseUrl}/normal.png`,
        rest: `${baseUrl}/rest.png`,
        happy: `${baseUrl}/happy.png`,
      },
    })
  }
}

characters.push({
  name: 'Fish',
  artist: artists.debbie,
  emotions: {
    angry: `/nft/characters/fish/angry.png`,
    worry: `/nft/characters/fish/worry.png`,
    normal: `/nft/characters/fish/normal.png`,
    rest: `/nft/characters/fish/rest.png`,
    happy: `/nft/characters/fish/happy.png`,
  },
})

characters.push({
  name: 'Minotaur',
  artist: artists.clive,
  emotions: {
    angry: `/nft/characters/minotaur/angry.png`,
    worry: `/nft/characters/minotaur/worry.png`,
    normal: `/nft/characters/minotaur/normal.png`,
    rest: `/nft/characters/minotaur/rest.png`,
    happy: `/nft/characters/minotaur/happy.png`,
  },
})

export { characters, backgrounds, artists }
