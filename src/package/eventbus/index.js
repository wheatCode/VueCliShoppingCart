import Vue from 'vue';
import ErrorMassage from '@/components/common/ErrorMassage';

Vue.prototype.$bus = new Vue();
Vue.component('error-massage', ErrorMassage);
