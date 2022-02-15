<template>
  <div class="mb-16">
    <div class="loadfile">
      <div class="row">
        <div class="gallery">
          <div v-if="logo" class="col-6 col-sm-4">
            <div @click="zoomImage(logo)" class="gallery-item">
              <img
                :src="logo.url"
                alt="Thumbnail"
                id="img-thumb"
                class="hidden"
              />
              <template>
                <div class="gallery-item__actions">
                  <a href="#" class="ml-5">
                    <img
                      @click.stop="showDeleteConfirmation()"
                      src="~@/assets/img/delete2.svg"
                      alt=""
                    />
                  </a>
                </div>
              </template>
              <div class="name_file">{{ logo.name }}</div>
            </div>
          </div>
          <div :class="classWapperUpload" v-else>
            <upload
              class="mockup-uploader"
              drag
              action=""
              list-type="picture"
              :on-change="handleChangeInput"
              :on-max-size="errorMaximum"
              :max-file-size="maximumSize"
              :auto-upload="false"
              :multiple="false"
            >
              <img
                class="el-icon-upload"
                src="~@/assets/img/upload_img.svg"
                alt=""
                style="margin-top:71px"
              />
              <div class="el-upload__text">
                Tải ảnh lên
              </div>
            </upload>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error" class="design-error ml-0">{{ error }}</div>
  </div>
</template>

<script>
import mixinUpload from '../mixins/upload'
import Upload from '@kit/Upload/Index'
import api from '../api'

const imageProcess = `${process.env.VUE_APP_ASSETS}/design-process.gif`
const MAXIMUM_SIZE = 1 // MB

export default {
  name: 'FileUpload',
  mixins: [mixinUpload],
  components: { Upload },
  props: {
    logoUrl: {
      type: String,
      default: '',
    },
  },
  computed: {
    classWapperUpload() {
      return this.logo ? 'col-sm-4' : 'col-sm-12'
    },
  },
  data() {
    return {
      logo: null,
      maximumSize: MAXIMUM_SIZE * 2 ** 20,
      isVisibleModal: false,
      url: '',
      isLoading: false,
    }
  },
  methods: {
    zoomImage(item) {
      this.url = item.url
      this.isVisibleModal = true
      this.$emit('zoom', item)
    },
    async handleUpload({ uid, name, raw }) {
      this.logo = { uid, url: imageProcess, name }
      this.$emit('uploading', true)
      const res = await this.upload(raw)
      this.$emit('uploading', false)
      if (!res || !res.success) {
        this.pushErrorMessages(res.message)
      } else {
        this.logo = { id: 0, name, url: res.url }
        this.fetchLogo()
        this.$emit('preview', res.url)
      }
    },
    async fetchLogo() {
      this.isLoading = true
      const res = await api.fetchLabelFile({
        url: this.logo.url,
        type: 'labels',
      })
      this.isLoading = false
      if (!res && res.error) {
        this.$toast.open({
          type: 'error',
          message: res.errorMessage,
          duration: 3000,
        })
        return
      }
      let URL = window.URL || window.webkitURL
      document.querySelector('#img-thumb').src = URL.createObjectURL(res)
      document.querySelector('#img-thumb').classList.remove('hidden')
    },
    async handleDelete() {
      this.logo = null
      this.$emit('preview', '')
    },
    errorMaximum({ name }) {
      this.pushErrorMessages(`"${name}" exceeds ${MAXIMUM_SIZE} megabytes`)
    },
  },
  watch: {
    logoUrl: {
      handler: function(val) {
        if (val) {
          this.logo = { id: 0, name: '', url: this.logoUrl }
          this.fetchLogo()
        }
      },
      immediate: true,
    },
  },
}
</script>
<style>
.loadfile .gallery {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.el-upload-dragger {
  border: 1px solid #e5e5e5;
  width: 200px;
  height: 200px;
  border-radius: 4px;
  background-color: #fff;
}
.el-upload-dragger .el-upload__text {
  font-weight: 400;
  color: #cfd0d0;
}
.el-upload-dragger .el-icon-upload {
  margin-bottom: 8px;
}
.loadfile .gallery .gallery-item:hover .gallery-item__actions {
  transition: opacity 0.2s ease-out;
  opacity: 1;
  background-color: #f6f7f7;
}
.loadfile .gallery .gallery-item {
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  border-left: none;
  border-right: none;
  height: 200px;
  width: 200px;
  position: relative;
}
.mockup-uploader {
  height: 200px;
}
.loadfile .gallery .gallery-item img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 8px;
}
.loadfile .gallery .gallery-item .gallery-item__actions {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0;
  z-index: 2;
  height: 30px;
}
.loadfile .gallery .gallery-item .name_file {
  opacity: 0;
}
</style>
