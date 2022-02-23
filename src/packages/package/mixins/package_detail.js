import { isEmpty } from '@/core/utils/common'
import {
  MAP_NAME_STATUS_PACKAGE,
  PackageStatusCreatedText,
  PackageStatusPendingPickupText,
  PackageAlertTypeWarehoseReturn,
} from '../constants'

export default {
  computed: {
    isEmpty() {
      return isEmpty(this.current)
    },
    current() {
      return this.package_detail.package || {}
    },
    hasCancelPackage() {
      const { status_string } = this.current
      return (
        status_string === PackageStatusCreatedText ||
        status_string === PackageStatusPendingPickupText
      )
    },
    hasEditPackage() {
      const { status_string } = this.current
      return status_string === PackageStatusCreatedText
    },
    hasMakeTracking() {
      const { status_string } = this.current
      return status_string === PackageStatusCreatedText
    },
    hasReshipPackage() {
      const { status_string, alert } = this.current
      return (
        status_string === PackageStatusPendingPickupText &&
        alert == PackageAlertTypeWarehoseReturn
      )
    },
    statusValue() {
      const { status_string } = this.current
      return status_string
        ? (MAP_NAME_STATUS_PACKAGE[status_string] || {}).value
        : ''
    },
    linkTrackInfo() {
      const { tracking_number } = this.current
      return `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${tracking_number}`
    },
  },
}
