<template>
  <div class="page-content page-not-found">
    <div class="content">
      <div class="content_404">
        <div class="content_404-img">
          <img src="~@/assets/img/404.svg" alt="" />
        </div>
        <h2>Something's missing</h2>
        <div class="content_404-text mb-24">
          This page is missing or you assembled the link incorrectly.
        </div>

        <p-button class=" btn-primary">Go back</p-button>
      </div>
    </div>
  </div>
</template>

<script>
import PButton from '../../../../uikit/components/button/Button'
export default {
  name: '404Sign',
  components: { PButton },
}
</script>
