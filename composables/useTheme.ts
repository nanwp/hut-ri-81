// Tema disimpan sebagai atribut data-theme di <html> (diinisialisasi oleh
// script inline di <head> sebelum paint) dan dipersist ke localStorage.
export function useTheme() {
  const toggle = () => {
    if (!import.meta.client) return
    const html = document.documentElement
    const berikutnya = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', berikutnya)
    try {
      localStorage.setItem('tema', berikutnya)
    } catch {
      // localStorage bisa tidak tersedia (mis. mode privat) — tema tetap berganti
    }
  }

  return { toggle }
}
