export const routes = [
  {
    path: '/packages',
    name: 'list-packages',
    meta: {
      title: 'Quản lý vận đơn',
    },
    component: () =>
      import(/* webpackChunkName: "packages" */ './views/ListPackages'),
  },
  {
    path: '/packages/:id',
    name: 'package-detail',
    meta: {
      title: 'Chi tiết đơn hàng',
    },
    component: () =>
      import(/* webpackChunkName: "packages" */ './views/PackageDetail'),
  },
]
