<template>
  <div class="modal__add-claim">
    <p-modal :active="visible" @close="handleClose" :title="title">
      <template>
        <div class="row mb-18">
          <div class="col-12">
            <label class="modal__add-claim-label"
              >Tên hàng hóa: <span>*</span></label
            >
            <input
              type="text"
              class="form-control"
              placeholder="Nhập tên hàng hóa"
              v-validate="'required'"
              name="name"
              v-model="productEdit.name"
              data-vv-as="Tên hàng hóa"
              :class="{ 'error-color': errors.has('name') }"
            />
            <span class="err-span" v-if="errors.has('name')">{{
              errors.first('name')
            }}</span>
          </div>
        </div>

        <div class="row mb-18">
          <div class="col-12">
            <label class="modal__add-claim-label">SKU: <span>*</span></label>
            <input
              type="text"
              class="form-control"
              placeholder="Nhập sku"
              v-validate="'required'"
              name="sku"
              v-model="productEdit.sku"
              data-vv-as="SKU"
              :class="{ 'error-color': errors.has('sku') }"
            />
            <span class="err-span" v-if="errors.has('sku')">{{
              errors.first('sku')
            }}</span>
          </div>
        </div>

        <div class="row mb-18">
          <div class="col-12">
            <label class="modal__add-claim-label">Loại hàng hóa:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nhập loại hàng hóa"
              v-model="productEdit.detail"
            />
          </div>
        </div>

        <div class="row mb-18">
          <div class="col-12 size">
            <label class="modal__add-claim-label">Trọng lượng:</label>
            <input
              type="number"
              class="form-control"
              placeholder="Nhập trọng lượng"
              v-model="productEdit.weight"
            />
            <div class="card__w-unit">gram</div>
          </div>
        </div>

        <div class="row mb-8">
          <div class="col-4 size">
            <label class="modal__add-claim-label">Dài:</label>
            <input
              type="number"
              class="form-control"
              placeholder="Nhập chiều dài"
              v-model="productEdit.length"
            />
            <div class="card__w-unit">cm</div>
          </div>

          <div class="col-4 size">
            <label class="modal__add-claim-label">Rộng:</label>
            <input
              type="number"
              class="form-control"
              placeholder="Nhập chiều rộng"
              v-model="productEdit.width"
            />
            <div class="card__w-unit">cm</div>
          </div>

          <div class="col-4 size">
            <label class="modal__add-claim-label">Cao:</label>
            <input
              type="number"
              class="form-control"
              placeholder="Nhập chiều cao"
              v-model="productEdit.height"
            />
            <div class="card__w-unit">cm</div>
          </div>
        </div>
      </template>

      <template slot="footer">
        <div></div>
        <div class="d-flex">
          <div>
            <p-button @click="handleClose" type="default"> Hủy </p-button>
          </div>
          <div class="ml-7">
            <p-button type="primary" @click="handleSave"> Lưu </p-button>
          </div>
        </div>
      </template>
    </p-modal>
  </div>
</template>

<script>
export default {
  name: 'ModalProduct',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      productEdit: {
        name: '',
        sku: '',
        detail: '',
        weight: '',
        length: '',
        width: '',
        height: '',
      },
    }
  },
  methods: {
    async handleSave() {
      const validate = await this.$validator.validateAll()
      if (!validate) {
        return
      }

      console.log(this.productEdit.detail)

      const data = {
        name: this.productEdit.name.trim(),
        sku: this.productEdit.sku.trim(),
        // detail: this.productEdit.detail?this.productEdit.detail.trim():'',
        // weight: this.productEdit.weight?+this.productEdit.weight:'',
        // length: this.productEdit.length?+this.productEdit.length:'',
        // width: this.productEdit.width?+this.productEdit.width:'',
        // height: this.productEdit.height?+this.productEdit.height:'',
      }

      if (this.productEdit.detail) {
        data.detail = this.productEdit.detail.trim()
      }
      if (this.productEdit.weight) {
        data.weight = +this.productEdit.weight
      }
      if (this.productEdit.length) {
        data.length = +this.productEdit.length
      }
      if (this.productEdit.width) {
        data.width = +this.productEdit.width
      }
      if (this.productEdit.height) {
        data.height = +this.productEdit.height
      }
      if (this.productEdit.id > 0) {
        data.id = this.productEdit.id
      }

      this.$emit('saveProduct', data)
      this.$emit('update:visible', false)
    },
    handleClose() {
      this.$emit('update:visible', false)
      this.$emit('close', true)
    },
  },
  watch: {
    visible: {
      handler: function() {
        if (this.visible) {
          this.productEdit = Object.assign({}, this.product)
        }
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss">
.modal__add-claim {
  .size {
    position: relative;
  }
  .card__w-unit {
    top: 38px;
    right: 20px;
  }
}
</style>
