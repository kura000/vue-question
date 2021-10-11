module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/common.scss";`
      }
    }
  },
  lintOnSave: false,
  publicPath: '/question/'
}
