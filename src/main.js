import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import firebaseConfig from '@/config/firebase.js'
import vuetify from './plugins/vuetify';

firebase.initializeApp(firebaseConfig); // firebaseconfig de linea 6
Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(() => {
  if(!app){
  app = new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
} 
})

