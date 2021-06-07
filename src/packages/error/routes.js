import { lazyLoadView, noAuthRequired } from '@core/router/helpers'

export const routes = [
  {
    path: '*',
    name: 'page-not-found',
    meta: {
      title: 'Page not found',
      layout: 'version2',
      class: 'page-error',
      ...noAuthRequired(),
    },
    component: () =>
      lazyLoadView(
        import(/* webpackChunkName: "page-not-found" */ './views/PageNotFound')
      ),
  },
  {
    path: '*',
    name: 'page-not-found-login',
    meta: {
      title: 'Page not found',
      layout: 'version2',
      class: 'page-error',
    },
    component: () =>
      lazyLoadView(
        import(/* webpackChunkName: "page-not-found" */ './views/404Sign')
      ),
  },
]
