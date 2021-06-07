<template>
  <p-modal
    :active="visible"
    title="Preview your first order"
    @close="handleClose"
  >
    <template>
      <div class="order-info mb-24">
        <span class="order-title">Order</span>
        <div class="row">
          <span class="col-3">Number:</span>
          <span class="col-9">226592</span>
        </div>
      </div>

      <div class="order-info mb-24">
        <span class="order-title">Customer</span>
        <div class="row">
          <span class="col-3">Name:</span>
          <span class="col-9">Heidi Erdman</span>
        </div>
        <div class="row">
          <span class="col-3">Date:</span>
          <span class="col-9">05/05/2020</span>
        </div>
        <div class="row">
          <span class="col-3">Address:</span>
          <span class="col-9">12317 Northlake ct, , Henrico 23233</span>
        </div>
        <div class="row">
          <span class="col-3">Shipping method:</span>
          <span class="col-9">DHL Express Shipping (DHL)</span>
        </div>
      </div>

      <div class="order-info">
        <span class="order-title">Order items</span>

        <table class="table table-hover table-orders">
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CAR 683KL FLC - Gray, M</td>
              <td>Jenny-car-flc-fleece-hoodie</td>
              <td>1</td>
            </tr>
            <tr>
              <td>3O P304 Gilmore Girls Puzzle</td>
              <td>3o-p304hvrd-puzzle</td>
              <td>5</td>
            </tr>
            <tr>
              <td>2IF 036UAAF HO SALE IF - Hoodie / XL</td>
              <td>2p-ptk008-ho-puzzle</td>
              <td>5</td>
            </tr>
            <tr>
              <td>2IF 036UAAF HO SALE IF - Hoodie / XL</td>
              <td>2p-ptk008-ho-puzzle</td>
              <td>5</td>
            </tr>
            <tr>
              <td>2IF 036UAAF HO SALE IF - Hoodie / XL</td>
              <td>2p-ptk008-ho-puzzle</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <template slot="footer">
      <div></div>
      <div class="group-button">
        <p-button type="default" @click="handleClose">
          Cancel
        </p-button>
        <p-button type="primary" :loading="isLoading">
          IMPORT
        </p-button>
      </div>
    </template>
  </p-modal>
</template>

<script>
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'

export default {
  name: 'ModalPreviewImportOrder',
  mixins: [mixinRoute, mixinTable],
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {},
  data() {
    return {
      isLoading: false,
      order: {},
      orderItems: [],
      isScanning: {
        status: Boolean,
      },
      form: {
        weight: 0,
        height: 0,
        width: 0,
        length: 0,
      },
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    },
  },
}
</script>
