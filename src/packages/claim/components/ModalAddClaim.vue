<template>
  <div class="modal__add-claim">
    <p-modal :active="visible" @close="handleClose" :title="`Khiếu nại`">
      <template>
        <div class="row mb-20">
          <div class="col-6">
            <label class="modal__add-claim-label"
              >Mã vận đơn: <span>*</span></label
            >
            <input
              type="text"
              class="form-control"
              placeholder="Nhập mã vận đơn"
              v-validate="'required'"
              name="name"
              data-vv-as="Tên"
              :class="{ 'error-color': errors.has('name') }"
            />
            <span v-if="errors.has('name')">{{ errors.first('name') }}</span>
          </div>
          <div class="col-6">
            <label class="modal__add-claim-label">Lý do:<span>*</span></label>
            <multiselect
              class="multiselect-custom dropdown-reason"
              v-model="reason"
              :options="reasons"
              placeholder="Choose one of  reasons"
              @select="handleSelect"
              :custom-label="customLabel"
              :class="{ required: requiredReason }"
            ></multiselect>
          </div>
        </div>
        <div class="row mb-20">
          <div class="col-12">
            <label class="modal__add-claim-label"
              >Tiêu đề: <span>*</span></label
            >
            <input
              type="text"
              class="form-control"
              placeholder="Nhập tiêu đề"
              v-validate="'required'"
              name="address"
              data-vv-as="Địa chỉ"
              :class="{ 'error-color': errors.has('address') }"
            />
            <span v-if="errors.has('address')">{{
              errors.first('address')
            }}</span>
          </div>
        </div>
        <div class="row mb-20">
          <div class="col-12 text__aria">
            <div
              class="text__aria-title d-flex justify-content-between align-items-center"
            >
              <label class="modal__add-claim-label"
                >Nội dung: <span>*</span></label
              >
              <span class="countText" :class="[countText(content)]"
                >{{ this.TicketNote }}/1000</span
              >
            </div>
            <textarea
              placeholder="Nhập nội dung "
              class="text__aria-content"
              v-model="content"
              :class="{
                required: requiredContent,
                require: lengthContent,
              }"
              @input="adjustIconsInTextarea"
              @keyup="countText(content)"
            ></textarea>
          </div>
        </div>
        <div class="row mb-20">
          <div class="modal__add-upload">
            <upload
              class="file-uploader"
              :action="uploadFileEndpoint"
              drag
              list-type="picture"
              :headers="uploadHeaders"
              :on-change="handleChangeFile"
              multiple
              :auto-upload="false"
              :max-file-size="100000000"
            >
              <div class="el-upload__text">
                Drop files to upload, or <em>browser</em>
              </div>
            </upload>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div>
          <img
            style="margin-bottom: 2px"
            src="~@/assets/img/InfoCircle.svg"
            alt=""
          />
          <b>Lưu ý:</b> (<span>*</span>) <i>Là các trường bắt buộc nhập.</i>
        </div>
        <div class="d-flex">
          <div>
            <p-button @click="handleClose" type="default" :disabled="loading">
              Bỏ qua
            </p-button>
          </div>
          <div class="ml-7">
            <p-button type="primary" @click="handleSave" :loading="loading">
              Tạo khiếu nại
            </p-button>
          </div>
        </div>
      </template>
    </p-modal>
  </div>
</template>
<script>
export default {
  name: 'ModalAddClaim',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      content: '',
      reason: null,
      lengthContent: false,
      reasons: [
        {
          key: 1,
          name: 'Order Modification',
        },
        {
          key: 2,
          name: 'Order Cancel',
        },
        {
          key: 3,
          name: 'Production time & tracking issues',
        },
        {
          key: 4,
          name: ' Labelling',
        },
        {
          key: 5,
          name: 'Post-delivery problem (wrong product, quality issues,...)',
        },
        {
          key: 6,
          name: 'Others',
        },
      ],
      requiredReason: false,
      selectReason: false,
      requiredContent: false,
      TicketNote: 0,
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
      this.$emit('close', true)
    },
    customLabel(reasons) {
      return reasons.name || this.formatReason(this.reason)
    },
    handleSelect(value) {
      this.reason = value
      this.requiredReason = false
      this.selectReason = true
    },
    adjustIconsInTextarea() {
      this.requiredContent = false
    },
    countText(val) {
      var len = val.length
      if (len > 1000) {
        this.TicketNote = len
        this.lengthContent = true
        return 'note_danger'
      } else {
        this.TicketNote = len
        this.lengthContent = false
        return 'note_success'
      }
    },
    formatReason(reason) {
      switch (reason) {
        case 1:
          return 'Order Modification'
        case 2:
          return 'Order Cancel'
        case 3:
          return 'Production time & tracking issues'
        case 4:
          return 'Labelling'
        case 5:
          return 'Post-delivery problem (wrong product, quality issues,...)'

        case 6:
          return 'Others'
      }
    },
  },
}
</script>
