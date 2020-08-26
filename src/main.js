import Vue from 'vue';
import App from './App.vue';
import router from './package/router';
import I18n from './package/veevalidate';
import './package/bootstrap';
import './package/axios';
import './package/vueLoadingOverlay';
import './package/fontawesome/';
import './package/eventbus';

Vue.config.productionTip = false;

new Vue({
  router,
  I18n,
  render: h => h(App)
}).$mount('#app');
