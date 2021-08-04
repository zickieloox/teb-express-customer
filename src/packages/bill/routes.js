export const routes = [
  {
    path: '/bill',
    name: 'bill-detail',
    meta: {
      title: 'Quản lý hóa đơn',
    },
    component: () =>
      import(/* webpackChunkName: "settings" */ './views/BillDetail'),
  },
  {
    path: '/bill/wallet',
    name: 'wallet',
    meta: {
      title: 'Wallet',
    },
    component: () =>
      import(/* webpackChunkName: "wallets" */ './views/Wallet.vue'),
  },
  {
    path: '/bill/topup',
    name: 'top-up',
    meta: {
      title: 'Topup',
    },
    component: () =>
      import(/* webpackChunkName: "wallets" */ './views/Topup.vue'),
  },
  {
    path: '/bill/list-bill',
    name: 'bill',
    meta: {
      title: 'List Bill',
    },
    component: () =>
      import(/* webpackChunkName: "wallets" */ './views/ListBills.vue'),
  },
]
