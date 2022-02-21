import i18n from '../i18n'
import S3Service from '@core/services/s3'

export default {
  props: {
    error: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      allowedTypes: ['image/png', 'image/jpeg', 'image/jpg'],
      allowedExtensions: /(\.jpg|\.jpeg|\.png)$/i,
    }
  },
  methods: {
    async validate(file) {
      if (
        !this.allowedExtensions.exec(file.name) ||
        !this.allowedTypes.includes(file.raw.type)
      ) {
        this.$toast.error(
          `File không đúng định dạng ! Định dạng upload phải là * PNG, * JPG, * JPEG`
        )
        return false
      }
      let img = await this.readLogo(file.raw)

      if (img.height > 84) {
        this.$toast.error(`Chiều cao file upload không vượt quá 84px`)
        return false
      }
      if (img.width > 84) {
        this.$toast.error(`Chiều rộng file upload không vượt quá 84px`)
        return false
      }
      return true
    },
    readLogo(file) {
      return new Promise((resolve) => {
        let reader = new FileReader()
        reader.onload = function(e) {
          let img = new Image()
          img.src = e.target.result
          img.onload = function() {
            resolve({
              width: img.width,
              height: img.height,
            })
          }
        }
        reader.readAsDataURL(file)
      })
    },
    async handleChangeInput(file) {
      let valid = await this.validate(file)
      if (!valid) {
        return
      }
      this.handleUpload(file)
    },
    async upload(file) {
      return await S3Service.upload('labels', file)
    },
    showDeleteConfirmation() {
      this.$confirm({
        title: i18n.delete.title,
        message: i18n.delete.description,
        confirmText: i18n.delete.button,
        type: i18n.delete.type,
        onConfirm: () => {
          this.handleDelete()
        },
      })
    },
    pushErrorMessages(message) {
      this.$toast.error(message)
    },
  },
}
