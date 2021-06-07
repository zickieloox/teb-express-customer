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
  name: 'SearchOrder',
  props: {
    index: {
      type: Number,
      default: 1,
    },
    value: {
      type: [Number, String],
      default: 'order-id',
    },
    filter: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selected: {
        key: 'order-id',
        name: 'Order ID',
      },
      isLoading: false,
      users: [],
      optionSearch: [
        {
          key: 'order-id',
          name: 'Order ID',
        },
        {
          key: 'order-number',
          name: 'Order Number',
        },
        {
          key: 'shipping-method',
          name: 'Shipping Method',
        },
        {
          key: 'tracking-number',
          name: 'Tracking Number',
        },
      ],
    }
  },
  created() {
    this.optionSearch.forEach((el) => {
      if (el.key === this.value) {
        this.$set(this, 'selected', el)
      }
    })
  },
  methods: {
    customLabel({ key, name }) {
      return typeof key !== 'undefined' ? `${name}` : ''
    },

    handleSelect(value) {
      this.$emit('selected', value.key, this.index)
    },

    handleRemove() {
      this.$emit('input', 0)
    },
  },
}
</script>
