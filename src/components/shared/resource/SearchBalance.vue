<template>
  <multiselect
    class="multiselect-custom dropdown-order"
    v-model="selected"
    :options="optionSearch"
    placeholder="More filters"
    :custom-label="customLabel"
    :loading="isLoading"
    @select="handleSelect"
    @remove="handleRemove"
  >
  </multiselect>
</template>

<script>
export default {
  name: 'SearchBalance',
  props: {
    index: {
      type: Number,
      default: 1,
    },
    value: {
      type: [Number, String],
      default: 'transaction-type',
    },
    filter: {
      type: Object,
      default: () => {},
    },
    optionSearch: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      selected: {
        key: 'more-filter',
        name: 'More filter',
      },
      isLoading: false,
      users: [],
    }
  },
  created() {
    this.selected =
      this.optionSearch[0].name == 'Transaction type'
        ? this.optionSearch[0]
        : this.selected
  },
  methods: {
    customLabel({ key, name }) {
      return typeof key !== 'undefined' ? `${name}` : ''
    },

    handleSelect(value) {
      this.$emit('selected', value.key, this.index)
    },

    handleRemove() {
      this.$emit('unselected', true)
    },
  },
}
</script>
