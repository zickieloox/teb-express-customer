export const routes = [
  {
    path: '/tracking',
    name: 'tracking',
    meta: {
      title: 'Hành trình đơn hàng   ',
    },
    component: () =>
      import(/* webpackChunkName: "packages" */ './views/Tracking.vue'),
  },
]
