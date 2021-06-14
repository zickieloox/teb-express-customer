export const routes = [
  {
    path: '/orders/claims',
    name: 'list-claim',
    meta: {
      title: 'Claim',
    },
    component: () =>
      import(/* webpackChunkName: "settings" */ './views/ListClaim.vue'),
  },
]
