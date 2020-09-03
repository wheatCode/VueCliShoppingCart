import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSpinner,
  faShoppingCart,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSpinner, faShoppingCart, faTrashAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);
