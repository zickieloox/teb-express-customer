<template>
  <div class="modal-template">
    <p-modal
      :active="visible"
      title="View import templates"
      @close="handleClose"
    >
      <template>
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card section-modal-template">
                <div class="card-block">
                  <div class="row">
                    <div class="col-12 detail">
                      <label>Tên template:</label>
                      <p-input
                        type="text"
                        placeholder="Nhập tên template"
                        :input="templateName"
                        v-model="templateName"
                      />
                    </div>
                    <div class="col-12 detail">
                      <label>File template:</label>
                      <upload
                        class="file-uploader"
                        :action="uploadFileEndpoint"
                        drag
                        :headers="uploadHeaders"
                        :on-change="handleChangeFile"
                        :auto-upload="false"
                        :max-file-size="100000000"
                      >
                        <div class="el-upload__text">
                          Kéo thả để upload file, hoặc <em>chọn</em>
                        </div>
                      </upload>
                    </div>
                    <div class="col-12 detail">
                      <div class="check-default mb-5">
                        <p-checkbox
                          v-model="isDefault"
                          :class="{ disable: !isDefault }"
                          >Đặt làm template mặc định</p-checkbox
                        >
                        <a
                          class="pull-right"
                          v-if="file.length"
                          href="javascript:void(0)"
                          @click="handleDownloadFile"
                        >
                          <img
                            src="@/assets/img/download_template.png"
                            style="vertical-align: sub;margin-left: 5px"
                          />
                          Tải về file template
                        </a>
                      </div>
                    </div>
                    <div class="col-12 detail">
                      <table class="table" id="field_table">
                        <tr>
                          <th>
                            <label>Import fields</label>
                          </th>
                          <th>
                            <label>Template fields</label>
                          </th>
                        </tr>
                        <tr
                          v-for="(field, index) in default_fields"
                          :key="index"
                        >
                          <td>
                            <div
                              class="p-input-group input-group form-icons"
                              v-if="field.require"
                            >
                              {{ field.name }}:&nbsp;<span style="color: red"
                                >*</span
                              >
                            </div>
                            <div
                              class="p-input-group input-group form-icons"
                              v-else
                            >
                              {{ field.name }}
                            </div>
                          </td>
                          <td>
                            <multiselect
                              class="multiselect-custom"
                              v-model="assign_fields[field.key]"
                              :options="optionFields"
                              :custom-label="customLabel"
                              @select="handleSelect"
                              @open="checkOpen"
                              @close="checkClose"
                              :id="index"
                              :track-by="`key`"
                            ></multiselect>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template slot="footer">
        <div class="group-button modal-confirm">
          <p-button type="default" @click="handleClose">
            Bỏ qua
          </p-button>
          <p-button
            type="primary"
            @click.prevent="handleSave()"
            :disabled="disabled"
            :loading="isSubmitting"
          >
            Lưu
          </p-button>
        </div>
      </template>
    </p-modal>
  </div>
</template>

<script>
import mixinUpload from '@core/mixins/upload'
import { Upload } from '@kit'
import { mapActions } from 'vuex'
import Browser from '@core/helpers/browser'
import {
  UPLOAD_TEMPLATE_FILE,
  UPDATE_IMPORT_ORDER_TEMPLATE,
  DOWNLOAD_TEMPLATE_FILE,
} from '../store/index'
import { LIST_DEFAULT_FIELD } from '../constants'
import { cloneDeep } from '@core/utils'
export default {
  name: 'ModalEditImportTemplate',
  mixins: [mixinUpload],
  components: { Upload },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    template: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      templateName: '',
      file: '',
      isDefault: false,
      isUploadNewFile: false,
      default_fields: LIST_DEFAULT_FIELD,
      show_full_options: false,
      import_fields: [],
      optionFields: [],
      assign_fields: [],
      isSubmitting: false,
    }
  },
  methods: {
    ...mapActions('setting', [
      UPLOAD_TEMPLATE_FILE,
      UPDATE_IMPORT_ORDER_TEMPLATE,
      DOWNLOAD_TEMPLATE_FILE,
    ]),
    handleClose() {
      this.$emit('update:visible', false)
    },
    handleSelect(item) {
      delete this.optionFields[item.key]
      this.optionFields = cloneDeep(this.optionFields)
    },
    checkClose(value, index) {
      const key = this.default_fields[index].key
      if (
        this.assign_fields[key] !== null &&
        this.assign_fields[key] !== undefined
      ) {
        delete this.optionFields[this.assign_fields[key].key]
        this.optionFields = cloneDeep(this.optionFields)
      }
    },
    checkOpen(index) {
      const key = this.default_fields[index].key
      if (
        this.assign_fields[key] !== null &&
        this.assign_fields[key] !== undefined
      ) {
        const temp = cloneDeep(this.optionFields)
        temp[this.assign_fields[key].key] = cloneDeep(this.assign_fields[key])
        this.optionFields = cloneDeep(temp)
      }
    },
    customLabel({ key, name }) {
      return typeof key !== 'undefined' ? `${name}` : ''
    },
    toogleFullOption() {
      let els = document.querySelectorAll('.unrequire')
      els.forEach((el) => {
        el.classList.toggle('hidden')
      })
      this.show_full_options = !this.show_full_options
    },
    handleChangeFile(file) {
      this.handleUploadfile(file)
    },
    async handleDownloadFile() {
      const payload = {
        url: this.file,
      }
      try {
        const result = await this[DOWNLOAD_TEMPLATE_FILE](payload)
        if (!result.success) {
          this.$toast.open({ type: 'error', message: `Download failed ! ` })
          return false
        }
        Browser.downloadBlob(result.blob, this.file.split('_').pop())
      } catch (e) {
        this.$toast.open({ type: 'error', message: `Download failed !` })
      }
    },
    async handleUploadfile(file) {
      let params = {
        file: file.raw,
      }
      this.isSubmitting = true
      const result = await this[UPLOAD_TEMPLATE_FILE](params)
      this.isSubmitting = false
      if (result.error) {
        if (result.error) {
          this.$toast.open({ type: 'error', message: result.message })
        }
        return
      }
      this.file = result.url
      this.optionFields = result.fields.map((field, index) => {
        return {
          key: index,
          name: field,
        }
      })
      this.import_fields = cloneDeep(this.optionFields)
      this.isUploadNewFile = true
      this.assign_fields = []
    },
    async handleSave() {
      const count = this.default_fields.length
      for (let i = 0; i <= count - 1; i++) {
        if (typeof this.assign_fields[i] === 'undefined') {
          this.assign_fields[i] = null
        }
      }
      const fields = this.default_fields.map((field) => {
        return field.key
      })
      const import_fields = this.import_fields
        .map((field) => {
          return field.name
        })
        .join(',')
      const payload = {
        id: this.template.id,
        template_name: this.templateName,
        file: this.file,
        is_default: this.isDefault ? 1 : 0,
        index_fields: fields,
        assign_fields: this.assign_fields,
        import_fields: import_fields,
        is_upload_new_file: this.isUploadNewFile,
      }
      this.isSubmitting = true
      const result = await this[UPDATE_IMPORT_ORDER_TEMPLATE](payload)
      this.isSubmitting = false
      if (!result.success) {
        this.$toast.open({ type: 'error', message: result.message })
        return
      }
      this.$emit('success')
    },
  },
  watch: {
    visible: {
      handler: function() {
        if (this.visible) {
          let assignedField = []
          this.template.fields.forEach((field) => {
            this.assign_fields[field.field_key] = {
              key: field.field_assign_key,
              name: field.field_assign_name,
            }
            assignedField[field.field_assign_key] = {
              key: field.field_assign_key,
              name: field.field_assign_name,
            }
          })
          const importFields = this.template.import_fields.split(',')
          this.optionFields = importFields
            .map((field, index) => {
              return {
                key: index,
                name: field,
              }
            })
            .filter((field) => {
              assignedField[field.key] === undefined
            })
          this.import_fields = importFields.map((field, index) => {
            return {
              key: index,
              name: field,
            }
          })
          this.templateName = this.template.name
          this.file = this.template.file
          this.isDefault = this.template.is_default ? true : false
        } else {
          this.optionFields = []
          this.assign_fields = []
          this.show_full_options = false
        }
      },
      immediate: true,
    },
  },
}
</script>
<style>
.check-default label {
  font-weight: normal !important;
}
.check-default .disable {
  opacity: 0.5;
}
.show-option {
  opacity: 0.5;
  color: #37393e !important;
  cursor: pointer;
}
.show-option:hover {
  color: #2a46b2 !important;
  opacity: 1;
}
.check-default .checkbox-custom {
  left: unset;
}
#field_table th,
#field_table td {
  border: none;
  width: 50%;
}
#field_table tr td:first-child {
  padding-top: 16px;
  padding-right: 8px;
}
#field_table tr td:last-child {
  padding-top: 16px;
  padding-left: 8px;
}
</style>
