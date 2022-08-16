const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "Climatic",
    themeColor: '#4787b1',
    msTileColor: '#000000',
    iconPaths: {
      faviconSVG: 'img/icons/logo.png',
      favicon32: 'img/icons/logo.png',
      favicon16: 'img/icons/logo.png',
      appleTouchIcon: 'img/icons/logo.png',
      maskIcon: 'img/icons/logo.svg',
      msTileImage: 'img/icons/logo.png'
    }
  }
})
