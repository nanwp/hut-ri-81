export interface Sesi {
  waktu: string
  judul: string
}

export interface Acara {
  id: string
  order: number
  title: string
  level: string
  dateStart: string
  dateEnd: string | null
  dateLabel: string
  timeLabel: string
  category: string
  description: string
  highlight: boolean
  sessions: Sesi[] | null
  lineup: string[] | null
  headliner: string | null
  formUrl: string | null
}

export interface BarisKlasemen {
  rt: string
  main: number
  menang: number
  seri: number
  kalah: number
}

export interface Pengeluaran {
  label: string
  amount: number
  date: string
}

export function poinKlasemen(b: BarisKlasemen): number {
  return b.menang * 3 + b.seri
}

export interface TierSponsor {
  id: string
  label: string
  amount: number
  benefits: string[]
}

export interface Sponsor {
  name: string
  tier: string
  logo: string | null
  url: string | null
}

export function totalSponsor(sponsors: Sponsor[], tiers: TierSponsor[]): number {
  const harga = new Map(tiers.map((t) => [t.id, t.amount]))
  return sponsors.reduce((jumlah, s) => jumlah + (harga.get(s.tier) ?? 0), 0)
}

export interface Donatur {
  name: string
  amount: number
  rt: string | null
}

export const KATEGORI_LABEL: Record<string, string> = {
  seremonial: 'Seremonial',
  lomba: 'Perlombaan',
  hiburan: 'Hiburan',
  olahraga: 'Olahraga'
}

export function totalDonasi(donors: Donatur[]): number {
  return donors.reduce((jumlah, d) => jumlah + d.amount, 0)
}
