import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user',
      component: () => import('../views/UserLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/UserHome.vue'),
        },
        {
          path: 'products',
          name: '產品列表',
          component: () => import('../views/UserProducts.vue'),
        },
        {
          path: 'cart',
          name: '購物車',
          component: () => import('../views/UserCart.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/UserLogin.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDashboard.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/AdminProducts.vue'),
        },
        {
          path: 'orders',
          component: () => import('../views/AdminOrders.vue'),
        },
      ],
    },

  ],
});

export default router;
