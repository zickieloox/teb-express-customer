import http from '@core/services/http'
import Browser from '@core/helpers/browser'

export default {
  methods: {
    async downloadFile(url, type, filename, prefix = 'Orders-') {
      if (!filename || filename == '') {
        const arr = url.split('/')
        arr.shift()
        filename = arr.join('_')
      }

      const buckets = {
        orders: 'export_orders',
        export_orders: 'export_orders',
        fulfillments: 'export_fulfill',
        export_fulfill: 'export_fulfill',
        export: 'export_orders',
      }

      const bucket = buckets[type] || 'export_orders'
      const data = await http.get(
        `/admin/fulfill/uploads/file-export/download?type=${bucket}&url=${url}`,
        {
          type: 'blob',
        }
      )

      try {
        Browser.downloadBlob(
          data,
          prefix +
            new Date().toLocaleDateString() +
            '.' +
            `${filename}`.split('.')[1]
        )
      } catch (error) {
        this.$toast.open({ type: 'error', message: 'File error !!!' })
      }
    },
  },
}
