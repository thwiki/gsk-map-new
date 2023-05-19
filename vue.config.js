const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false,
  filenameHashing: true,
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '幻想乡柱状地图';
        args[0].desc = '这是一份来自幻想乡的地图';
        args[0].site = 'https://map.thwiki.cc/';
        args[0].staticSite = 'https://static.thwiki.cc/';
        return args;
      });
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.externals = {
        'vue': 'Vue',
      };
    }
  }
})
