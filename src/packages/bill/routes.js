export const routes = [
  {
    path: '/bill/:code',
    name: 'bill-detail',
    meta: {
      title: 'Quản lý hóa đơn',
      detail: true,
      routeParent: { name: 'bill' },
    },
    component: () =>
      import(/* webpackChunkName: "settings" */ './views/BillDetail'),
  },
  {
    path: '/bill',
    name: 'bill',
    props: true,
    meta: {
      title: 'Hóa đơn',
    },
    component: () =>
      import(/* webpackChunkName: "settings" */ './views/BillDashboard'),
  },
]
