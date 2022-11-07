const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //打包时，不打包map文件
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    host:'127.0.0.1',
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{ '^/api':'' }  重写路径
      }
    }
  }
})
