import Vue from 'vue';
import App from './App.vue';
import router from './plugins/router';
import I18n from './plugins/veevalidate';
import vuetify from './plugins/vuetify';
import './plugins/bootstrap';
import './plugins/axios';
import './plugins/vueLoadingOverlay';
import './plugins/fontawesome';
import './plugins/eventbus';

Vue.config.productionTip = false;

new Vue({
  router,
  I18n,
  vuetify,
  render: h => h(App)
}).$mount('#app');
