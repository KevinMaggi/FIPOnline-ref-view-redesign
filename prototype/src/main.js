import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.prototype.$auth = false
Vue.prototype.$tessera = 'A000000'
Vue.prototype.$pw = 'password'
Vue.prototype.$email = 'user@email.com'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
