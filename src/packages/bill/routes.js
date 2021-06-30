export const routes = [
  {
    path: '/bill',
    name: 'list-bill',
    meta: {
      title: 'Quản lý hóa đơn',
    },
    component: () =>
      import(/* webpackChunkName: "settings" */ './views/ListBill.vue'),
  },
]
