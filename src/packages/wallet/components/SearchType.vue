<template>
  <multiselect
    class="multiselect-custom dropdown-order"
    v-model="selected"
    :options="optionSearch"
    :placeholder="placeHolder"
    :custom-label="customLabel"
    :loading="isLoading"
    @select="handleSelect"
    @remove="handleRemove"
    :type="type"
  >
  </multiselect>
</template>

<script>
export default {
  name: 'SearchType',
  props: {
    index: {
      type: Number,
      default: 1,
    },
    value: {
      type: [Number, String],
      default: 'transaction-type',
    },
    placeHolder: {
      type: String,
      default: '',
    },
    filter: {
      type: Object,
      default: () => {},
    },
    optionSearch: {
      type: Array,
      default: () => {},
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selected: {
        key: 'more-filter',
        name: 'Loại',
      },
      isLoading: false,
      users: [],
    }
  },
  created() {
    console.log(this.type)
    this.selected = this.type
      ? this.optionSearch.find((item) => item.key == this.type)
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
