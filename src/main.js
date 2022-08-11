import Vue from 'vue'
import {Vuelidate} from "vuelidate"
import App from './App.vue'
import './registerServiceWorker'
import messagePlugin from "@/utils/message.plugin";
import dateFilter from "@/filters/date.filter"
import currencyFilter from "@/filters/currency.filter";
import tooltipDirective from "../directives/tooltip.directive";
import router from './router'
import store from './store'

import PreLoader from "@/components/app/PreLoader";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/database"

Vue.config.productionTip = false

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdFyqBjiub_iktK4cpN2HxiKnWa51Mr_s",
  authDomain: "crm-bookkeeping.firebaseapp.com",
  projectId: "crm-bookkeeping",
  storageBucket: "crm-bookkeeping.appspot.com",
  messagingSenderId: "802342655564",
  appId: "1:802342655564:web:d4811df403f1e7b7ab06e9",
  measurementId: "G-K90YVQ4TQJ"
};

firebase.initializeApp(firebaseConfig)

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.component('PreLoader', PreLoader)
Vue.directive('tooltip', tooltipDirective)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
