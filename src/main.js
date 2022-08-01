import Vue from 'vue'
import {Vuelidate} from "vuelidate"
import App from './App.vue'
import './registerServiceWorker'
import messagePlugin from "@/utils/message.plugin";
import dateFilter from "@/filters/date.filter"
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
