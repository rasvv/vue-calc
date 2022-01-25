import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import components from '@/components';

Vue.config.productionTip = false
Vue.use(components);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
