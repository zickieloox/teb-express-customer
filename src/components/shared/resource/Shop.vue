<template>
  <multiselect
    class="multiselect-custom"
    v-model="selected"
    :options="shops"
    placeholder="Search shop"
    :custom-label="customLabel"
    :loading="isLoading"
    @search-change="handleSearchShops"
    @select="handleSelect"
    @remove="handleRemove"
  >
  </multiselect>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import debounce from 'lodash/debounce'
import { FETCH_SHOPS } from '@/packages/shared/store'

export default {
  name: 'ResourceShop',
  computed: {
    ...mapState('shared', {
      shops: (state) => state.shops,
    }),
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    error: {
      type: String,
      default: '',
    },
    allowSelectAll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: '',
      isLoading: false,
    }
  },
  // mounted() {
  //   if (!this.shops || !this.shops.length) {
  //     this.handleSearchShops()
  //   }
  // },
  methods: {
    ...mapActions('shared', [FETCH_SHOPS]),

    handleSearchShops: debounce(async function(search = '') {
      this.isLoading = true
      const result = await this.fetchShops({ search: search })
      this.isLoading = false

      if (result && result.success) {
        // this.selected = this.value
        //   ? this.shops.find(({ id }) => this.value === id)
        //   : {}
        // this.handleSelect(this.selected)
        return
      }

      this.$toast.open({ type: 'error', message: result.message })
    }, 500),

    handleSelect(shop) {
      this.$emit('input', shop && shop.id ? shop.id : 0)
    },

    handleRemove() {
      this.$emit('input', 0)
    },

    customLabel({ name, domain }) {
      return typeof name !== 'undefined' ? `${name} - ${domain}` : ''
    },
  },
}
</script>
