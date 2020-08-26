import Vue from 'vue';
import App from './App.vue';
import router from './packages/router';
import I18n from './packages/veevalidate';
import './packages/bootstrap';
import './packages/axios';
import './packages/vueLoadingOverlay';
import './packages/fontawesome/';
import './packages/eventbus';

Vue.config.productionTip = false;

new Vue({
  router,
  I18n,
  render: h => h(App)
}).$mount('#app');
