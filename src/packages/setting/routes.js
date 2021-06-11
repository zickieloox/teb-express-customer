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
]