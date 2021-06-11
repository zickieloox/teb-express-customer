export default {
  computed: {
    cityCode() {},
    city() {
      if (!this.senderEditing.city) {
        return {}
      }
      const cityFound = this.cities.find(
        ({ Name }) => Name === this.senderEditing.city
      )

      if (!cityFound) {
        this.senderEditing.district = ''
        this.senderEditing.wards = ''
      }

      return cityFound || {}
    },
    districts() {
      return this.city !== {} ? this.city['Districts'] : []
    },
    district() {
      if (!this.districts) {
        return {}
      }
      const districtFound = this.districts.find(
        (element) => element.Name === this.senderEditing.district
      )
      if (!districtFound) {
        this.senderEditing.district = ''
        this.senderEditing.wards = ''
      }
      return districtFound || {}
    },
    wards() {
      if (!this.senderEditing.district || !this.district) {
        return {}
      }
      return this.district !== {} ? this.district['Wards'] : []
    },
  },
}
