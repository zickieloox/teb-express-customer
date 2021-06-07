<template>
  <multiselect
    class="multiselect-custom"
    v-model="selected"
    :options="products"
    placeholder="Search product base"
    :custom-label="customLabel"
    @search-change="handleSearchProductTypes"
    @select="handleSelect"
    @remove="handleRemove"
  >
    <li slot="beforeList" class="multiselect__element">
      <input type="text" class="form-control" :value="query" />
    </li>
  </multiselect>
</template>

<script>
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
export default {
  name: 'ProductType',
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    products: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    validProducts() {
      return this.query
        ? this.products.filter(
            ({ name }) =>
              name.toLowerCase().indexOf(this.query.toLowerCase()) !== -1
          )
        : this.products
    },
  },
  data() {
    return {
      query: '',
      selected: null,
    }
  },
  mounted() {
    if (this.value && this.value.id && this.products && this.products.length) {
      const product = this.products.find(({ id }) => id === this.value.id)

      if (product) {
        const selected = Object.assign({}, product)
        this.selected = isEmpty(selected) ? null : selected
      }
    }
  },
  methods: {
    handleSearchProductTypes: debounce(async function(search = '') {
      this.query = search
    }, 500),

    handleSelect(product) {
      this.$emit('input', product || {})
    },

    handleRemove() {
      this.$emit('input', {})
    },

    customLabel(product) {
      return product ? product.name : 'Select product base'
    },
  },
}
</script>
