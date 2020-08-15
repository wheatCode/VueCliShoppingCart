import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Introduce from '@/components/Introduce';
import Child1 from '@/components/childs/child1';
import Child2 from '@/components/childs/child2';
import Child3 from '@/components/childs/child3';
import Login from '@/components/pages/Login';
import Home from '@/components/pages/Home';
import Products from '@/components/pages/Products';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/products'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/introduce',
    name: 'Introduce',
    components: { default: Introduce, child: Child1 },
    children: [
      {
        path: 'child2',
        component: Child2
      },
      {
        path: 'child3',
        component: Child3
      }
    ]
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
  console.log(data.success);

  console.log(to.meta.requiresAuth, from.meta.requiresAuth);
});

export default router;
