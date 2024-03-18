import { createApp } from 'vue'
import App from './App.vue'
import component from '@/components'
import store from './store'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
		.use(store)
    .use(vuetify)
    .mount('#app')
