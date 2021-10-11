module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/common.scss";`
      }
    }
  },
  lintOnSave: false,
  publicPath: 'https://kura000.github.io/vue-question/'
}
