<template>
  <div class="card card-shadow">
    <div class="card-block bg-white p-20">
      <slot name="icon" />
      <span class="ml-15 font-weight-400">
        <slot name="heading" />
      </span>
      <div class="content-text text-center mb-0">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Statistic',
}
</script>
