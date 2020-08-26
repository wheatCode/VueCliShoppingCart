import Vue from 'vue';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueLoading, {
  canCancel: false,
  color: '#6f42c1',
  loader: 'spinner', //spinner/dots/bars
  width: 50,
  height: 50,
  backgroundColor: '#ffffff',
  isFullPage: true,
  opacity: 0.8
});
