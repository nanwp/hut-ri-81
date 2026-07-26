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
  maxSlots: number
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

export function sisaSlot(tier: TierSponsor, sponsors: Sponsor[]): number {
  const terisi = sponsors.filter((s) => s.tier === tier.id).length
  return Math.max(0, tier.maxSlots - terisi)
}

export interface Donatur {
  name: string
  amount: number
  rt: string | null
  /**
   * true = donasi terkumpul (akumulasi banyak warga jadi satu catatan).
   * Tetap dihitung ke total dana, tapi tidak ikut peringkat karena
   * bukan sumbangan satu orang.
   */
  collective?: boolean
  /** jumlah warga yang menyumbang pada entri kolektif */
  contributors?: number | null
  /** keterangan singkat, mis. "Kotak amal keliling RT 03" */
  note?: string | null
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

/** donatur perorangan, urut dari nominal terbesar — ini yang masuk leaderboard */
export function peringkatDonatur(donors: Donatur[]): Donatur[] {
  return donors.filter((d) => !d.collective).sort((a, b) => b.amount - a.amount)
}

/** catatan donasi terkumpul, di luar leaderboard tapi tetap masuk total */
export function donasiKolektif(donors: Donatur[]): Donatur[] {
  return donors.filter((d) => d.collective)
}

/** total warga yang tercakup pada entri kolektif (0 kalau tidak didata) */
export function totalPenyumbangKolektif(donors: Donatur[]): number {
  return donasiKolektif(donors).reduce((jumlah, d) => jumlah + (d.contributors ?? 0), 0)
}
