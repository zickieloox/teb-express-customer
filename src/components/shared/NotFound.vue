<template>
  <div class="page-content page__empty">
    <div class="content">
      <div class="content_404">
        <div class="page__empty-img">
          <img src="~@/assets/img/empty.svg" alt="" />
          <p>Nothing here / Not found</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptySearchResult',
}
</script>
<style lang="scss" scoped>
.page__empty {
  height: 100%;
}
.content {
  height: 100%;
  background: white;
  position: relative;
}
.content_404 {
  width: max-content;
  height: max-content;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
