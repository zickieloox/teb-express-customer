import { lazyLoadView, noAuthRequired } from '@core/router/helpers'

export const routes = [
  {
    path: '/sign-in',
    name: 'sign-in',
    meta: {
      title: 'Sign In',
      layout: 'auth',
      class: 'page-auth',
      ...noAuthRequired(),
    },
    component: () =>
      lazyLoadView(
        import(/* webpackChunkName: "sign-in" */ './views/SignIn.vue')
      ),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    meta: {
      title: 'Sign Up',
      layout: 'auth',
      class: 'page-auth',
      ...noAuthRequired(),
    },
    component: () =>
      lazyLoadView(
        import(/* webpackChunkName: "sign-up" */ './views/SignUp.vue')
      ),
  },
  // {
  //   path: '/forgot',
  //   name: 'forgot',
  //   meta: {
  //     title: 'Forgot',
  //     layout: 'auth',
  //     class: 'page-auth',
  //     ...noAuthRequired(),
  //   },
  //   component: () =>
  //     lazyLoadView(
  //       import(/* webpackChunkName: "forgot" */ './views/Forgot.vue')
  //     ),
  // },
  // {
  //   path: '/verify-email',
  //   name: 'verify-email',
  //   meta: {
  //     title: 'Verify Email',
  //     layout: 'auth',
  //     class: 'page-auth',
  //     ...noAuthRequired(),
  //   },
  //   component: () =>
  //     lazyLoadView(
  //       import(/* webpackChunkName: "verify-email" */ './views/VerifyEmail.vue')
  //     ),
  // },
  // {
  //   path: '/reset-password',
  //   name: 'reset-password',
  //   meta: {
  //     title: 'Reset Password',
  //     layout: 'auth',
  //     class: 'page-auth',
  //     ...noAuthRequired(),
  //   },
  //   component: () =>
  //     lazyLoadView(
  //       import(/* webpackChunkName: "forgot" */ './views/ResetPassword.vue')
  //     ),
  // },
]
