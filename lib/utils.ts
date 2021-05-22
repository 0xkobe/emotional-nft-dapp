import { getAddress, isAddress } from '@ethersproject/address'

export function shortenAddress(address: string, chars = 4): string {
  if (!isAddress(address)) return ''
  const parsed = getAddress(address)
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export function capitalize(s: string): string {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function formatDate(d: Date): string {
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

  return `${day}/${month}/${year}`
}

export function lockDurationToString(duration: number): string {
  // TODO: need to be updated
  return '6 months'
}

export function formatNumber(n: number): string {
  return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}