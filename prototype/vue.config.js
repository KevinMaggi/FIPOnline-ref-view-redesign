module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/variables.scss";'
      }
    }
  },
  pwa: {
    name: 'FipOnline',
    version: '0.1.0',
    themeColor: '#0055A2',
    background_color: '#E7E7E7',
    start_url: 'http://fiponline.netsons.org',
    display: 'standalone',
    orientation: 'portrait'
  }
}
