export const routes = [
  {
    path: '/wallet',
    name: 'wallet',
    meta: {
      title: 'Wallet',
    },
    component: () =>
      import(/* webpackChunkName: "wallets" */ './views/Wallet.vue'),
  },
]
