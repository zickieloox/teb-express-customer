import { lazyLoadView } from '@core/router/helpers'

export const routes = [
  {
    path: '/',
    name: 'dashboard',
    meta: {
      title: 'Dashboard',
    },
    component: () =>
      lazyLoadView(import(/* webpackChunkName: "dashboard" */ './views/Index')),
  },
]
