<template>
  <p-modal
    :active="visible"
    title="Preview your first order"
    @close="handleClose"
  >
    <template>
      <div class="order-info mb-24">
        <div class="will-import">
          <span class="will-number"
            >You will be importing
            <span class="number">{{ numberorder }} orders.</span></span
          >
          <div
            >Importing will
            <span class="bold">overwrite any existing orders</span> that have
            the same sku and order.
          </div>
        </div>
        <span class="order-title">Order</span>
        <div class="row">
          <span class="col-4 pr-0">Number:</span>
          <span class="col-8 pl-0">{{ order.ref_id }}</span>
        </div>
      </div>

      <div class="order-info mb-24">
        <span class="order-title">Customer</span>
        <div class="row">
          <span class="col-4 pr-0">Name:</span>
          <span class="col-8 pl-0">{{ order.full_name }}</span>
        </div>
        <div class="row">
          <span class="col-4 pr-0">Date:</span>
          <span class="col-8 pl-0">{{
            order.created_at | date('dd/MM/yyyy HH:mm:ss ')
          }}</span>
        </div>
        <div class="row">
          <span class="col-4 pr-0">Address:</span>
          <span v-if="order.address" class="col-8 pl-0"
            >{{ order.address }}, {{ order.city }}</span
          >
          <span v-else class="col-8 pl-0"
            >{{ order.address2 }}, {{ order.city }}</span
          >
        </div>
      </div>

      <div class="order-info">
        <span class="order-title">Order items</span>
        <div class="table-import">
          <table class="table table-hover table-orders">
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Design Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="item-import"
                v-for="(item, i) in order.order_items"
                :key="i"
              >
                <td style="max-width: unset">{{ item.name }}</td>
                <td style="max-width: unset">{{ item.sku }}</td>
                <td style="max-width: unset" v-if="item.design">{{
                  item.design.name
                }}</td>
                <td v-else></td>
                <td>{{ item.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <template slot="footer">
      <div></div>
      <div class="group-button">
        <p-button type="default" @click="handleClose">
          Cancel
        </p-button>
        <p-button
          type="primary"
          @click="handleImportFile"
          data-style="expand-left"
          :loading="isLoading"
        >
          Upload
        </p-button>
      </div>
    </template>
  </p-modal>
</template>

<style>
.col-3 {
  padding-right: 0;
}
</style>

<script>
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'

export default {
  name: 'ModalPreviewImport',
  mixins: [mixinRoute, mixinTable],
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Object,
      default: () => {},
    },
    importing: {
      type: Boolean,
      default: false,
    },
    numberorder: {
      type: Number,
      default: 0,
    },
  },

  computed: {},
  data() {
    return {
      isLoading: false,
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
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    handleImportFile() {
      if (this.importing) {
        return
      }
      this.$emit('import')
    },
  },
}
</script>
<style>
.item-import {
  white-space: nowrap;
}
.bold,
.number {
  font-weight: bold;
  color: #17191d !important;
}
</style>
