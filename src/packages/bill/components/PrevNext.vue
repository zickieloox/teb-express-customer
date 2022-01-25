<template>
  <div class="title-pagi">
    <div
      class="btn-pagi mr-2"
      :class="{ 'disable-next-page': !hasPrev }"
      @click="prev"
    >
      <i class="fas fa-chevron-left"></i>
    </div>
    <div
      class="btn-pagi"
      @click="next"
      :class="{ 'disable-next-page': !hasNext }"
    >
      <i class="fas fa-chevron-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: [Number, String],
    perPage: {
      type: [Number, String],
      default: 25,
    },
    current: {
      type: [Number, String],
      default: 1,
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.perPage)
    },
    hasPrev() {
      return this.current > 1
    },
    hasNext() {
      return this.current < this.pageCount
    },
  },
  methods: {
    prev() {
      if (!this.hasPrev) return

      this.$emit('change', this.current - 1)
      this.$emit('update:current', this.current - 1)
    },

    next() {
      if (!this.hasNext) return

      this.$emit('change', this.current + 1)
      this.$emit('update:current', this.current + 1)
    },
  },
}
</script>
