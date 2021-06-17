<template>
  <p-modal :active="visible" :title="title" @close="handleClose">
    <template>
      <div align="center">
        <span class="example">
          Download a
          <a :href="csvTemplate" target="_blank">sample CSV template</a>
          to see an example of the format required
        </span>
        <div class="center-error">
          <div
            v-if="Array.isArray(error) && error.length > 0"
            class="center-block-error"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12.5V12.5083M10 7.5V9.16667V7.5Z"
                stroke="#DB1802"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.16666 15.8334H15.8333C16.1053 15.8315 16.3726 15.7631 16.612 15.6342C16.8514 15.5052 17.0556 15.3196 17.2068 15.0936C17.3581 14.8676 17.4517 14.608 17.4795 14.3375C17.5074 14.067 17.4686 13.7938 17.3667 13.5418L11.45 3.33343C11.3059 3.07293 11.0946 2.85579 10.8381 2.70458C10.5817 2.55338 10.2894 2.47363 9.99166 2.47363C9.69395 2.47363 9.40166 2.55338 9.1452 2.70458C8.88874 2.85579 8.67746 3.07293 8.53333 3.33343L2.61666 13.5418C2.51661 13.7881 2.47694 14.0547 2.50095 14.3195C2.52497 14.5843 2.61197 14.8395 2.75471 15.0638C2.89744 15.2881 3.09175 15.475 3.32143 15.6088C3.55111 15.7427 3.80949 15.8197 4.075 15.8334"
                stroke="#DB1802"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div v-if="Array.isArray(error) && error.length > 1" class="example"
              >There were errors importing your csv file. After you fix the
              error, try importing the CSV file again.
            </div>
            <div v-else class="example"
              >There was an error importing your csv file. After you fix the
              error, try importing the CSV file again.
            </div>
            <div v-if="Array.isArray(error) && error.length > 0">
              <ul v-for="(item, i) in error" :key="i" class="center-error-list">
                <li class="error-item">{{ item }}</li>
              </ul>
            </div>
          </div>

          <div
            v-if="Array.isArray(error1) && error1.length > 0"
            class="center-block-error1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12.5V12.5083M10 7.5V9.16667V7.5Z"
                stroke="#DB1802"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.16666 15.8334H15.8333C16.1053 15.8315 16.3726 15.7631 16.612 15.6342C16.8514 15.5052 17.0556 15.3196 17.2068 15.0936C17.3581 14.8676 17.4517 14.608 17.4795 14.3375C17.5074 14.067 17.4686 13.7938 17.3667 13.5418L11.45 3.33343C11.3059 3.07293 11.0946 2.85579 10.8381 2.70458C10.5817 2.55338 10.2894 2.47363 9.99166 2.47363C9.69395 2.47363 9.40166 2.55338 9.1452 2.70458C8.88874 2.85579 8.67746 3.07293 8.53333 3.33343L2.61666 13.5418C2.51661 13.7881 2.47694 14.0547 2.50095 14.3195C2.52497 14.5843 2.61197 14.8395 2.75471 15.0638C2.89744 15.2881 3.09175 15.475 3.32143 15.6088C3.55111 15.7427 3.80949 15.8197 4.075 15.8334"
                stroke="#DB1802"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div
              class="example1"
              v-if="Array.isArray(error1) && error1.length > 0"
            >
              <div v-for="(item, i) in error1" :key="i">
                <div class="error-item">{{ item }}</div>
              </div>
            </div>
          </div>
        </div>

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
    error: {
      type: Array,
    },
    error1: {
      type: Array,
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
