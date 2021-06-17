<template>
  <p-modal :active="visible" :title="title" @close="handleClose">
    <template v-if="uploading">
      <div class="text-center processing">
        <p>Quá trình nhập file excel có thể sẽ mất một vài phút ...</p>
        <img src="~@/assets/img/loading.gif" />
      </div>
    </template>
    <template v-else>
      <div align="center">
        <span class="example">
          Download a
          <a :href="csvTemplate" target="_blank">sample CSV template</a>
          to see an example of the format required
        </span>
        <upload
          class="order-uploader"
          :action="createEndpoint(`packages/import`)"
          drag
          :auto-upload="false"
          :headers="uploadHeaders"
          :on-change="handleChangeFile"
          :max-file-size="100000000"
        >
          <img class="el-icon-upload" src="~@/assets/img/upload.png" alt="" />
          <div class="el-upload__text">
            Drop files to upload, or <em>browser</em>
          </div>
          <div v-if="!lastItem" class="el-before-upload__text">
            No file chosen
          </div>
          <div v-else class="el-before-upload__text">
            {{ lastItem.name }}
          </div>
        </upload>
      </div>
    </template>

    <template slot="footer">
      <a></a>
      <div class="group-button">
        <p-button type="default" @click="handleClose" :disabled="loading">
          Cancel
        </p-button>
        <p-button
          type="primary"
          @click.prevent="handleSave"
          :disabled="!lastItem || uploading"
          :loading="loading"
        >
          Preview and Upload
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
      importDataErrors: {},
      isVisiblePreview: false,
      isUploading: false,
      isVisibleImport: false,
    }
  },
  computed: {
    validFiles() {
      return this.files[this.files.length - 1]
    },
    csvTemplate() {
      return `${process.env.VUE_APP_ASSETS}/lionnix-template-fulfill-v2.csv`
    },
  },
  methods: {
    handleClose() {
      if (this.isLoading === true) {
        return
      }
      this.$emit('update:visible', false)
      this.$emit('reset', true)
    },
    handleSave() {
      if (this.loading === true) {
        return
      }
      this.$emit('selected', this.lastItem)
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
