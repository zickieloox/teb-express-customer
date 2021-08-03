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
    path: '/bills',
    name: 'list-bills',
    meta: {
      title: 'List Bill',
    },
    component: () =>
      import(/* webpackChunkName: "wallets" */ './views/ListBills.vue'),
  },
]
