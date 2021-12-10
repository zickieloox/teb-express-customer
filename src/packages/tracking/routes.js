export const routes = [
  {
    path: '/tracking',
    name: 'tracking',
    meta: {
      title: 'Tracking ',
    },
    component: () =>
      import(/* webpackChunkName: "packages" */ './views/Tracking.vue'),
  },
]
