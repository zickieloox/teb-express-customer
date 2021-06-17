export const routes = [
  {
    path: '/packages/claims',
    name: 'list-claim',
    meta: {
      title: 'Claim',
    },
    component: () =>
      import(/* webpackChunkName: "settings" */ './views/ListClaim.vue'),
  },
]
