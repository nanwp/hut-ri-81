import site from './data/site.json'

// Script inline anti-FOUC: set tema sebelum paint pertama.
// Default light — mode gelap hanya untuk yang memilih sendiri lewat toggle.
const temaInit = `(function(){try{var t=localStorage.getItem('tema');if(t!=='dark'&&t!=='light'){t='light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`

// Isi site.url di data/site.json setelah deploy agar og:image jadi URL absolut
// (WhatsApp & sebagian scraper hanya membaca URL absolut)
const ogImage = `${site.url || ''}/og.png`
const judul = 'Semarak Kemerdekaan RW 01 — HUT RI ke-81'
const deskripsi =
  'Festival rakyat HUT RI ke-81 RW 01: upacara & lomba tiap RT, sepak bola antar RT, pentas seni anak, sepeda hias, dan panggung dangdut Mardatila Group. 16 Agustus – 6 September 2026, oleh Karang Taruna RW 01.'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  modules: ['@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  components: [{ path: '~/components', pathPrefix: false }],

  fonts: {
    families: [
      { name: 'Anton', provider: 'google', weights: [400] },
      { name: 'Bricolage Grotesque', provider: 'google', weights: [400, 500, 600, 700, 800], styles: ['normal', 'italic'] }
    ]
  },

  app: {
    head: {
      htmlAttrs: { lang: 'id', 'data-theme': 'light' },
      title: judul,
      meta: [
        { name: 'description', content: deskripsi },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: judul },
        { property: 'og:description', content: deskripsi },
        { property: 'og:image', content: ogImage },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'theme-color', content: '#fff3e0' }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      script: [{ innerHTML: temaInit }]
    }
  },

  nitro: {
    prerender: { routes: ['/', '/donasi', '/galeri', '/sponsor'] }
  }
})
