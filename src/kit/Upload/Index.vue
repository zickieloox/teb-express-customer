<script>
import Migrating from '../mixins/migrating'
import Upload from './Upload'

function noop() {}

export default {
  name: 'ElUpload',

  mixins: [Migrating],

  components: {
    Upload,
  },

  provide() {
    return {
      uploader: this,
    }
  },

  props: {
    action: {
      type: String,
      required: true,
    },
    headers: {
      type: Object,
      default() {
        return {}
      },
    },
    data: Object,
    multiple: Boolean,
    name: {
      type: String,
      default: 'file',
    },
    drag: Boolean,
    dragger: Boolean,
    withCredentials: Boolean,
    showFileList: {
      type: Boolean,
      default: true,
    },
    accept: String,
    type: {
      type: String,
      default: 'select',
    },
    beforeUpload: Function,
    beforeRemove: Function,
    onRemove: {
      type: Function,
      default: noop,
    },
    onChange: {
      type: Function,
      default: noop,
    },
    onPreview: {
      type: Function,
    },
    onSuccess: {
      type: Function,
      default: noop,
    },
    onProgress: {
      type: Function,
      default: noop,
    },
    onError: {
      type: Function,
      default: noop,
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    listType: {
      type: String,
      default: 'text',
    },
    httpRequest: Function,
    disabled: Boolean,
    limit: Number,
    onExceed: {
      type: Function,
      default: noop,
    },
    onMaxSize: {
      type: Function,
      default: noop,
    },
    limitPreviewSize: {
      type: Number,
      default: 5242880,
    },
    maxFileSize: {
      type: Number,
      default: 500000,
    },
  },

  data() {
    return {
      uploadFiles: [],
      dragOver: false,
      draging: false,
      tempIndex: 1,
    }
  },

  computed: {
    uploadDisabled() {
      return this.disabled
    },
  },

  watch: {
    listType(type) {
      if (type === 'picture-card' || type === 'picture') {
        this.uploadFiles.forEach((file) => {
          if (!file.url && file.raw) {
            try {
              file.url = URL.createObjectURL(file.raw)
            } catch (err) {
              console.error('[Element Error][Upload]', err)
            }
          }
        })
      }
    },
  },

  methods: {
    handleStart(rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++
      let file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile,
      }

      if (this.listType === 'picture-card' || this.listType === 'picture') {
        try {
          if (this.limitPreviewSize > rawFile.size) {
            file.url = URL.createObjectURL(rawFile)
          }
        } catch (err) {
          console.error('[Element Error][Upload]', err)
          return
        }
      }

      this.uploadFiles.push(file)
      this.onChange(file, this.uploadFiles)
    },
    handleProgress(ev, rawFile) {
      const file = this.getFile(rawFile)
      this.onProgress(ev, file, this.uploadFiles)
      file.status = 'uploading'
      file.percentage = ev.percent || 0
    },
    handleSuccess(res, rawFile) {
      const file = this.getFile(rawFile)

      if (file) {
        file.status = 'success'
        file.response = res

        this.onSuccess(res, file, this.uploadFiles)
        this.onChange(file, this.uploadFiles)
      }
    },
    handleError(err, rawFile) {
      const file = this.getFile(rawFile)
      const fileList = this.uploadFiles

      file.status = 'fail'

      fileList.splice(fileList.indexOf(file), 1)

      this.onError(err, file, this.uploadFiles)
      this.onChange(file, this.uploadFiles)
    },
    handleRemove(file, raw) {
      if (raw) {
        file = this.getFile(raw)
      }
      let doRemove = () => {
        this.abort(file)
        let fileList = this.uploadFiles
        fileList.splice(fileList.indexOf(file), 1)
        this.onRemove(file, fileList)
      }

      if (!this.beforeRemove) {
        doRemove()
      } else if (typeof this.beforeRemove === 'function') {
        const before = this.beforeRemove(file, this.uploadFiles)
        if (before && before.then) {
          before.then(() => {
            doRemove()
          }, noop)
        } else if (before !== false) {
          doRemove()
        }
      }
    },
    getFile(rawFile) {
      let fileList = this.uploadFiles
      let target
      fileList.every((item) => {
        target = rawFile.uid === item.uid ? item : null
        return !target
      })
      return target
    },
    abort(file) {
      this.$refs['upload-inner'].abort(file)
    },
    clearFiles() {
      this.uploadFiles = []
    },
    submit() {
      this.uploadFiles
        .filter((file) => file.status === 'ready')
        .forEach((file) => {
          this.$refs['upload-inner'].upload(file.raw)
        })
    },
    getMigratingConfig() {
      return {
        props: {
          'default-file-list': 'default-file-list is renamed to file-list.',
          'show-upload-list': 'show-upload-list is renamed to show-file-list.',
        },
      }
    },
    listenChange(e) {
      this.$emit('e-change', e)
    },
  },

  beforeDestroy() {
    this.uploadFiles.forEach((file) => {
      if (file.url && file.url.indexOf('blob:') === 0) {
        URL.revokeObjectURL(file.url)
      }
    })
  },

  render() {
    let uploadList
    const uploadData = {
      props: {
        type: this.type,
        drag: this.drag,
        action: this.action,
        multiple: this.multiple,
        'before-upload': this.beforeUpload,
        'with-credentials': this.withCredentials,
        headers: this.headers,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.uploadFiles,
        autoUpload: this.autoUpload,
        listType: this.listType,
        disabled: this.uploadDisabled,
        limit: this.limit,
        maxFileSize: this.maxFileSize,
        'on-max-size': this.onMaxSize,
        'on-exceed': this.onExceed,
        'on-start': this.handleStart,
        'on-progress': this.handleProgress,
        'on-success': this.handleSuccess,
        'on-error': this.handleError,
        'on-preview': this.onPreview,
        'on-remove': this.handleRemove,
        'http-request': this.httpRequest,
        'e-change': this.listenChange,
      },
      ref: 'upload-inner',
    }

    const trigger = this.$slots.trigger || this.$slots.default
    const uploadComponent = <upload {...uploadData}>{trigger}</upload>

    return (
      <div>
        {this.listType === 'picture-card' ? uploadList : ''}
        {this.$slots.trigger
          ? [uploadComponent, this.$slots.default]
          : uploadComponent}
        {this.$slots.tip}
        {this.listType !== 'picture-card' ? uploadList : ''}
      </div>
    )
  },
}
</script>
