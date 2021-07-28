<template>
  <div class="page page-auth layout-auth">
    <div class="main-header">
      <img alt="home" src="~@/assets/img/logo.svg" class="main-logo" />
      <div class="help">
        <img class="help-icon" src="~@/assets/img/Support.svg" alt="help" />
        <a target="_blank" class="help-text">Cần trợ giúp ?</a>
      </div>
    </div>
    <div class="page-background">
      <div class="circle">
        <div class="animate">
          <div class="icon icon-boat-truck"></div>
          <div class="icon icon-box-plane"></div>
        </div>
      </div>

      <div class="circle__word"></div>
    </div>
    <main class="page-content">
      <router-view :key="$route.path"></router-view>
    </main>
  </div>
</template>
<script>
export default {
  name: 'LayoutAuth',
}
</script>
