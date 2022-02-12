<template>
  <img
    v-if="uri"
    :src="uri"
    :data-src="src"
    alt="Thumbnail"
    :class="className"
    @error="handleImageError"
    v-bind="$attrs"
  />
</template>

<script>
// import api from '@/packages/design/api'
import { extension } from '@core/utils/url'

// const THUMBNAIL_DEFAULT = `${process.env.VUE_APP_ASSETS}/thumbnail.png`
const THUMBNAIL_SUCCESS = `${process.env.VUE_APP_ASSETS}/upload-success.svg`
const THUMBNAIL_PSD_DEFAULT = `${process.env.VUE_APP_ASSETS}/psd-default.png`
const THUMBNAIL_CSV_DEFAULT = `${process.env.VUE_APP_ASSETS}/csv-default.png`

export default {
  name: 'Thumbnail',
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  computed: {
    thumbnail() {
      if (this.src) {
        return this.getThumbnailUrl(this.src)
      }

      return THUMBNAIL_SUCCESS
    },
    ext() {
      return extension(this.src)
    },
  },
  data() {
    return {
      uri: '',
      image: null,
      count: 0,
      className: '',
      callAPi: false,
    }
  },
  mounted() {
    this.createImage(this.thumbnail)
  },
  methods: {
    createImage(src) {
      this.image = this.image || new Image()
      this.image.addEventListener('load', () => {
        this.handlerSuccess(src)
      })
      this.image.addEventListener('error', this.handleImageError)
      this.image.src = src
    },
    handleImageError() {
      if (!this.src || this.ext === 'psd' || this.ext === 'csv') return

      this.className = 'miss-thumbnail'
      this.uri = THUMBNAIL_SUCCESS

      setTimeout(() => {
        if (this.count < 10) {
          this.createImage(`${this.thumbnail}?t=${new Date().getTime()}`)
          this.count++
        }
      }, 3000)

      if (this.callAPi) return

      // api
      //   .missingThumbnail(this.src)
      //   .then((res) => {
      //     this.callAPi = true
      //     if (res && res.success) {
      //       this.createImage(`${res.url}?t=${new Date().getTime()}`)
      //       return
      //     }
      //     this.showNotify()
      //   })
      //   .catch(this.showNotify)
    },
    handlerSuccess(src) {
      this.className = ''
      this.uri = src
      this.loaded = true
      this.image = null
    },
    showNotify() {},
    getThumbnailUrl(src) {
      if (this.ext === 'psd') return THUMBNAIL_PSD_DEFAULT
      if (this.ext === 'csv') return THUMBNAIL_CSV_DEFAULT
      if (src.indexOf('http') === 0) return src
      return `${process.env.VUE_APP_BASE_IMAGE_URL}/${src}`
    },
  },
  watch: {
    src() {
      this.createImage(this.thumbnail)
    },
  },
}
</script>
