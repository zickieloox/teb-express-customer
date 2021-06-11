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
