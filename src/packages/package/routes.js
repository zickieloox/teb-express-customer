export const routes = [
  {
    path: '/packages/create',
    name: 'package-create',
    meta: {
      title: 'Tạo đơn lẻ ',
    },
    component: () =>
      import(/* webpackChunkName: "packages" */ './views/CreatePackage.vue'),
  },
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
