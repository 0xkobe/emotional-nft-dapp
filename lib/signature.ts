export function payloadForSignatureEIP712v4(
  chainId: number,
  author: string,
  backgroundId: number,
  description: string,
  name: string,
) {
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
      ],
    },
    domain: {
      name: 'QNFT',
      version: '1',
      chainId: chainId,
      // verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC', // Leaving it as comment because could be useful as it's in the EIP712 spec
    },
    primaryType: 'Metadata' as const,
    message: {
      author,
      backgroundId,
      description,
      name,
    },
  }
  return typedData
}
