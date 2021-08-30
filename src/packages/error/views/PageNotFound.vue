<template>
  <div class="page-content page-not-found">
    <div class="content">
      <div class="content_logo">
        <img src="https://ship.lionbay.express/img/logo.4a0f4600.svg" alt="" />
      </div>
      <div class="content_404">
        <div class="content_404-img">
          <img src="~@/assets/img/404.svg" alt="" />
        </div>
        <h2>Something's missing</h2>
        <div class="content_404-text mb-24">
          This page is missing or you assembled the link incorrectly. Here are
          some helpful links instead:
        </div>
        <div class="content_404-link">
          <ul class="content_404-list">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li> <router-link to="/sign-in"> Sign in</router-link></li>
            <li>
              <a target="_blank" href="#">FAQ</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AuthService from '@core/services/auth'
// import ShopService from '@core/services/shop'

export default {
  name: 'PageNotFound',

  // mounted() {
  //   AuthService.clear()
  //   ShopService.clear()
  // },
}
</script>
