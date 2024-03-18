// module.exports = {
// 	transpileDependencies: [
// 		'vuetify'
// 	],
// 	publicPath: process.env.NODE_ENV === 'production' ? '/vue-calc/' : '/'
// 	// publicPath: '/vue-mySite/'
// }
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
