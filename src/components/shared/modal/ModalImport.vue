<template>
  <p-modal
    :active="visible"
    :title="title"
    @close="handleClose"
    :disable-close="uploading"
  >
    <template v-if="uploading">
      <div class="text-center processing">
        <p>Quá trình nhập file excel có thể sẽ mất một vài phút ...</p>
        <img src="~@/assets/img/loading.gif" />
      </div>
    </template>
    <template v-else>
      <div align="center">
        <span class="example">
          Tải về file <a :href="csvTemplate" target="_blank">mẫu XLSX</a>
        </span>
        <div class="text-left select_template">
          <label>Templates</label>
          <div id="templates">
            <multiselect
              class="multiselect-custom"
              :options="optionsTemplate"
              placeholder="Select an import template"
              v-model="template"
              :custom-label="customLabel"
            >
            </multiselect>
          </div>
        </div>
        <upload
          class="order-uploader"
          :action="createEndpoint(`packages/import`)"
          drag
          :auto-upload="false"
          :headers="uploadHeaders"
          :on-change="handleChangeFile"
          :on-max-size="errorSizeFileHandler"
          :max-file-size="2048000"
        >
          <img class="el-icon-upload" src="~@/assets/img/upload.png" alt="" />
          <div class="el-upload__text">
            Kéo thả file để upload hoặc <em>tải lên</em>
          </div>
          <div v-if="!lastItem" class="el-before-upload__text">
            Chưa có file nào được chọn .
          </div>
          <div v-else class="el-before-upload__text">
            {{ lastItem.name }}
          </div>
        </upload>
      </div>
    </template>

    <template slot="footer">
      <div class="rule">
        <img
          style="margin-bottom: 3px"
          src="@/assets/img/InfoCircle.svg"
          alt="alert"
        />
        <i
          ><b>Lưu ý:</b>Định dạng file hợp lệ là XLSX và có dung lượng dưới
          2Mb.</i
        >
      </div>
      <div class="group-button">
        <p-button
          type="default"
          @click="handleClose"
          :disabled="loading || uploading"
        >
          Bỏ qua
        </p-button>
        <p-button
          type="primary"
          @click.prevent="handleSave"
          :disabled="!lastItem || uploading"
          :loading="loading || isLoading"
        >
          Tải lên
        </p-button>
      </div>
    </template>
  </p-modal>
</template>

<script>
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import mixinUpload from '@core/mixins/upload'
import { Upload } from '@kit/index'
import { mapActions, mapState } from 'vuex'
import { FETCH_IMPORT_ORDER_TEMPLATES } from '../../../packages/setting/store'

export default {
  name: 'ModalImport',
  mixins: [mixinRoute, mixinTable, mixinUpload],
  components: { Upload },
  props: {
    title: {
      type: String,
      default: 'Import Orders',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    uploading: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      files: [],
      uploadedIds: [],
      lastItem: null,
      filteredArr: [],
      importData: {
        file: null,
        shop_id: null,
      },
      template: null,
      optionsTemplate: [],
      isLoading: false,
      importDataErrors: {},
      isVisiblePreview: false,
      isUploading: false,
      isVisibleImport: false,
    }
  },
  computed: {
    ...mapState('setting', {
      templates: (state) => state.templates,
    }),
    validFiles() {
      return this.files[this.files.length - 1]
    },
    csvTemplate() {
      return `${process.env.VUE_APP_ASSETS}/shipping-template.xlsx`
    },
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('setting', [FETCH_IMPORT_ORDER_TEMPLATES]),
    async init() {
      this.isLoading = true
      const payload = {
        is_fetch_all: true,
      }
      const result = await this[FETCH_IMPORT_ORDER_TEMPLATES](payload)
      this.isLoading = false

      if (!result.success) {
        this.$toast.open({ type: 'error', message: result.message })
        return
      }
      const lionix_temp = {
        id: null,
        name: 'Lionbay Default Template',
      }
      this.template = lionix_temp
      const tempsFilter = []
      tempsFilter.push(lionix_temp)
      this.templates.forEach((temp) => {
        if (temp.is_default) {
          this.template = {
            id: temp.id,
            name: temp.name,
          }
        }
        tempsFilter.push({
          id: temp.id,
          name: temp.name,
        })
      })
      this.optionsTemplate = tempsFilter
    },
    handleClose() {
      if (this.isLoading === true || this.uploading) {
        return
      }
      this.$emit('update:visible', false)
      this.$emit('reset', true)
    },
    errorSizeFileHandler() {
      this.$toast.open({
        type: 'error',
        message: 'File upload vượt quá dung lượng cho phép',
      })
    },
    customLabel({ name }) {
      return name
    },
    handleSave() {
      if (this.loading || this.isLoading) {
        return
      }
      this.$emit('selected', this.lastItem, this.template)
    },
    handlePreview() {
      this.$emit('preview')
    },

    handleChangeFile(file) {
      this.$emit('change', true)
      const index = this.files.findIndex(({ uid }) => uid === file.uid)
      if (index === -1) {
        this.files.push(file)
        this.lastItem = this.files[this.files.length - 1]
      } else {
        this.$set(this.files, index, file)
      }
    },
  },
  watch: {
    file: {
      handler: function(val) {
        this.file = val
      },
      immediate: true,
    },
    visible: {
      handler: function(val) {
        this.isVisible = val
      },
      immediate: true,
    },
  },
}
</script>
<style scoped>
.rule {
  font-size: 12px;
  width: 50%;
}
.select_template {
  margin-bottom: 8px;
  line-height: 160%;
}
.select_template label {
  padding-left: 0;
  vertical-align: bottom;
  margin-bottom: 2px;
}
.select_template #templates {
  display: inline-block;
  width: calc(100% - 90px);
  margin-left: 16px;
}
/*#templates .multiselect__input {*/
/*  background-color: inherit;*/
/*}*/
</style>
