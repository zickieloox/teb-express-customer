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
    path: '/packages/:id',
    name: 'package-detail',
    meta: {
      title: 'Chi tiết đơn hàng',
    },
    component: () =>
      import(/* webpackChunkName: "packages" */ './views/PackageDetail'),
  },
]
