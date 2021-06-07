<template>
  <div class="page-content page-not-found">
    <div class="content">
      <div class="content_404">
        <div class="content_404-img">
          <img src="~@/assets/img/noresult.svg" alt="" />
        </div>
        <h2>No Result Found</h2>
        <div class="content_404-text mb-24">
          We cannot find the item you are searching for, maybe a little spelling
          mistake?
        </div>

        <p-button class=" btn-primary">Go back</p-button>
      </div>
    </div>
  </div>
</template>

<script>
import PButton from '../../../../uikit/components/button/Button'
export default {
  name: 'PageResultNotFound',
  components: { PButton },
}
</script>
