import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Login from '@/components/pages/Login';
import Home from '@/components/pages/admin/Home';
import Product from '@/components/pages/admin/Product';
import A_Order from '@/components/pages/admin/Order';
import Coupon from '@/components/pages/admin/Coupon';
import C_Order from '@/components/pages/customer/Order';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/admin/product'
  },
  {
    path: '/admin',
    redirect: '/admin/product',
    component: Home,
    children: [
      {
        path: 'product',
        name: 'Product',
        component: Product,
        meta: { requiresAuth: true }
      },
      {
        path: 'order',
        name: 'a_order',
        component: A_Order,
        meta: { requiresAuth: true }
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: Coupon,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/customer',
    redirect: '/customer/order',
    component: Home,
    children: [
      {
        path: 'order',
        name: 'c_order',
        component: C_Order
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  const api = `${process.env.VUE_APP_URL}/api/user/check`;
  const { data } = await axios.post(api);

  to.meta.requiresAuth
    ? data.success
      ? next()
      : next({ path: '/login' })
    : next();
});

export default router;
