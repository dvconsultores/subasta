import App from './App.vue'
import axios from "axios";
import initI18n from '@/plugins/i18n'
import router from './Routes'
import store from './store/index'
import Toast from "vue-toastification";
import Vue from 'vue'
import VueAnimateOnScroll from 'vue-animate-onscroll';
import VueApexCharts from 'vue-apexcharts'
import vuetify from './plugins/vuetify'

import * as VueGoogleMaps from 'vue2-google-maps';
import "vue-toastification/dist/index.css";

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.use(VueAnimateOnScroll);
const i18n = initI18n("ES", "US");

Vue.use(axios);

Vue.use(Toast);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App), store
}).$mount('#app')
