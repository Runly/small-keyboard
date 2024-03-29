import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/common/plugins/element-ui'
import '@/assets/css/reset.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
