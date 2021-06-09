// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function payloadForSignatureEIP712v4(data: {
  chainId: number
  author: string
  backgroundId: number
  description: string
  name: string
  timestamp: number
  bulkMintNumber?: number
  tokenId?: string
  metaId?: number
}) {
  const typedData = {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        // { name: 'verifyingContract', type: 'address' }, // Leaving it as comment because could be useful as it's in the EIP712 spec
      ],
      Metadata: [
        { name: 'author', type: 'string' },
        { name: 'backgroundId', type: 'uint32' },
        { name: 'description', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'timestamp', type: 'uint256' },
      ],
    },
    domain: {
      name: 'QNFT',
      version: '1',
      chainId: data.chainId,
      // verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', // Leaving it as comment because could be useful as it's in the EIP712 spec
    },
    primaryType: 'Metadata' as const,
    message: {
      author: data.author,
      backgroundId: data.backgroundId,
      description: data.description,
      name: data.name,
      timestamp: data.timestamp,
      bulkMintNumber: data.bulkMintNumber,
      tokenId: data.tokenId,
      metaId: data.metaId,
    },
  }

  // add optional data
  if (data.bulkMintNumber)
    typedData.types.Metadata.push({ name: 'bulkMintNumber', type: 'uint32' })
  if (data.tokenId)
    typedData.types.Metadata.push({ name: 'tokenId', type: 'string' })
  if (data.metaId)
    typedData.types.Metadata.push({ name: 'metaId', type: 'uint32' })

  return typedData
}
