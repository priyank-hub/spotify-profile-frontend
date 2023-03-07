import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/app.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const shared = require.context('./Shared', true, /\.vue$/i)
shared.keys().map((key) =>
  Vue.component(key.split('/').pop().split('.')[0], shared(key).default),
);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
