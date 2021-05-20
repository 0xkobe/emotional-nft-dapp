import { Contract } from '@ethersproject/contracts'
import { useCallback, useEffect, useState } from 'react'
import {
  Background,
  Creature,
  Favcoin,
  LockPeriod,
  Metadata,
  Skin,
  Traits,
} from '../types/metadata'

// TODO: remove when API is ready
const metadataMock: Metadata = {
  name: 'Super Bitcoin Bear',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis felis in tincidunt posuere. Nullam imperdiet convallis augue vulputate sollicitudin.',
  external_url: '',
  image: 'https://via.placeholder.com/320x320',
  attributes: [
    { trait_type: Traits.Creature, value: Creature.Bear },
    { trait_type: Traits.Skin, value: Skin.Gold },
    { trait_type: Traits.Background, value: Background.NightBoat },
    { trait_type: Traits.Favcoin, value: Favcoin.BTC },
    { trait_type: Traits.Lock, value: LockPeriod.SixMonths },
    { trait_type: Traits.CreatorName, value: 'px4.eth' },
    { trait_type: Traits.CreatorWallet, value: '0x' },
  ],
}

export default function useNFT(contract: Contract | undefined, id: number) {
  const [loading, setLoading] = useState<boolean>(false)
  const [metadata, setMetadata] = useState<Metadata>()
  const [error, setError] = useState<Error>()

  const fetchMetadata = useCallback(
    async (contract: Contract, id: number) => {
      try {
        setLoading(true)
        const tokenURI = await contract.tokenURI(id)
        console.log(tokenURI)
        // TODO: fetch metadata
        const metadata = metadataMock
        setMetadata(metadata)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [contract, id],
  )

  useEffect(() => {
    if (!contract) return
    void fetchMetadata(contract, id)
  }, [contract, id])

  return {
    loading,
    error,
    metadata,
  }
}
