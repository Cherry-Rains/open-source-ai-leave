const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/wechatService': {
        target: 'http://10.0.13.248:11111',
        changeOrigin: true,
        pathRewrite: { '^/wechatService': '' },
      },
    },
  },
});