import { lazyLoadView, noAuthRequired } from '@core/router/helpers'

export const routes = [
  {
    path: '/setting/account',
    name: 'account',
    meta: {
      title: 'Account',
      ...noAuthRequired(),
    },
    component: () =>
      lazyLoadView(
        import(/* webpackChunkName: "settings" */ './views/Account.vue')
      ),
  },
]
