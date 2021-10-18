export const routes = [
  {
    path: '/setting/account',
    name: 'account',
    meta: {
      title: 'Account',
    },
    component: () =>
      import(/* webpackChunkName: "settings" */ './views/Account.vue'),
  },
  {
    path: '/setting/list-sender',
    name: 'list-sender',
    meta: {
      title: 'Danh sách người gửi',
    },
    component: () =>
      import(/* webpackChunkName: "settings" */ './views/ListSender.vue'),
  },
  {
    path: '/setting/api',
    name: 'api',
    meta: {
      title: 'API',
    },
    component: () =>
      import(/* webpackChunkName: "settings" */ './views/API.vue'),
  },
  {
    path: '/setting/templates',
    name: 'list-template',
    meta: {
      title: 'View import templates',
    },
    component: () =>
      import(/* webpackChunkName: "settings" */ './views/ListTemplate'),
  },
]
