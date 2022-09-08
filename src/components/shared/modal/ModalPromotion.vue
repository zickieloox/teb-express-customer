<template v-if="uploading">
  <p-modal :active="visible" title="Promotion" @close="handleClose">
    <template>
      <div class="row mb-18 promotion_row">
        <div class="col-12">
          <label class="modal__add-claim-label">Tên: </label>
          <multiselect
            placeholder="Vui lòng chọn"
            class="multiselect-custom"
            v-model="promotion"
            :options="promotions"
            :custom-label="customLabel"
          ></multiselect>
        </div>
      </div>

      <div class="row promotion_row">
        <div class="col-12">
          <label class="modal__add-claim-label">Mô tả:</label>
          <textarea
            class="form-control"
            rows="9"
            resize="false"
            name="description"
            readonly
            v-model="description"
          ></textarea>
        </div>
      </div>
    </template>
    <template slot="footer">
      <div></div>
      <div class="d-flex">
        <div>
          <p-button @click="handleClose" type="default"> Đóng</p-button>
        </div>
      </div>
    </template>
  </p-modal>
</template>
<style></style>

<script>
import { mapState } from 'vuex'
import { cloneDeep } from '@core/utils'
export default {
  name: 'ModalPromotion',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('shared', {
      promotions: (state) => state.promotions,
    }),
  },
  data() {
    return {
      promotion: null,
      description: '',
    }
  },
  methods: {
    customLabel({ name }) {
      return name
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
  },
  watch: {
    visible: {
      handler: function(v) {
        if (v && this.promotions.length) {
          this.promotion = cloneDeep(this.promotions[0])
        }
      },
    },
    promotion: {
      handler: function(v) {
        this.description = v ? v.description : ''
      },
    },
  },
}
</script>
<style>
.promotion_row .form-control,
.promotion_row .multiselect__tags,
.promotion_row .multiselect__single,
.promotion_row .multiselect__input {
  background-color: #f6f7f7 !important;
  border-color: #e1e2e2;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}
.promotion_row .multiselect__single {
  border: none;
}
.promotion_row textarea.form-control {
  position: relative !important;
  top: 0;
  left: 0;
  height: auto;
  overflow: visible;
}
</style>
