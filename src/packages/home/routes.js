import { lazyLoadView } from '@core/router/helpers'

export const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home',
    },
    component: () =>
      lazyLoadView(import(/* webpackChunkName: "dashboard" */ './views/Home')),
  },
]
