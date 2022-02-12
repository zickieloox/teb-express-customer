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
      isUploading: '',
      errorMessages: [],
      allowedTypes: ['image/png', 'image/jpeg', 'image/jpg'],
      allowedExtensions: /(\.jpg|\.jpeg|\.png)$/i,
      deleteItem: {},
    }
  },
  methods: {
    validate(file) {
      if (
        this.allowedExtensions.exec(file.name) ||
        this.allowedTypes.includes(file.raw.type)
      ) {
        return true
      }
      this.isUploading = false
      return false
    },
    handleChangeInput(file) {
      if (!this.validate(file)) {
        this.$toast.error(
          `File không đúng định dạng ! Định dạng upload phải là * PNG, * JPG, * JPEG`
        )
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
