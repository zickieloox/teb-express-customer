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
  {
    path: '/orders/claims/:id',
    name: 'claim-detail',
    meta: {
      title: 'Claim Detail',
    },
    component: () =>
      import(/* webpackChunkName: "settings" */ './views/ClaimDetail.vue'),
  },
]
