export const routes = [
  {
    path: '/bill',
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
    path: '/bill/wallet',
    name: 'wallet',
    meta: {
      title: 'Ví của tôi',
    },
    component: () =>
      import(/* webpackChunkName: "wallets" */ './views/Wallet.vue'),
  },
  {
    path: '/bill/topup',
    name: 'top-up',
    meta: {
      title: 'Ví của tôi',
    },
    component: () =>
      import(/* webpackChunkName: "wallets" */ './views/Topup.vue'),
  },
  {
    path: '/bill/list-bill',
    name: 'bill',
    meta: {
      title: 'Hóa đơn',
    },
    component: () =>
      import(/* webpackChunkName: "wallets" */ './views/ListBills.vue'),
  },
]
