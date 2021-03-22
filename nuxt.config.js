export default {
  target: 'static',
  // ssr: 'true',
  head: {
    title: process.env.VUE_APP_TITLE,
    meta: [{
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'msapplication-TileColor',
        content: '#ffffff',
      },
      {
        name: 'theme-color',
        content: '#ffffff',
      },
      {
        property: 'og:image',
        content: '/clf-og-min.png',
      }
    ],
    link: [{
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Exo+2:wght@200;500&display=swap',
      }
    ]
  },
  publicRuntimeConfig: {
    baseUrl: process.env.VUE_BASE_URL || 'http://localhost:8888',
    baseApi: process.env.VUE_BASE_API || 'https://api.cyberleaf.pl/wp-json/',
  },
  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
  },
  styleResources: {
    scss: [
      "@/assets/scss/_variables.scss",
      "@/assets/scss/_mixins.scss",
      "@/assets/scss/_fonts.scss",
      "@/assets/scss/_animations.scss",
    ]
  },
  loading: '@/components/loading.vue',
  serverMiddleware: [
    '~/middleware/redirects',
    '~/server/index',
  ],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/svg',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],
  build: {
    extend: function(config, {
      isDev,
      isClient
    }) {
      config.node = {
        fs: "empty",
        net: "empty"
      };
    }
  },
}
