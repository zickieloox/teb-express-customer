<template>
  <div class="multiselect-custom-phone-wrap">
    <multiselect
      class="multiselect-custom-phone"
      v-model="currentCode"
      :options="countryPhoneCode"
      :custom-label="customLabel"
      select-label="choose"
      @select="handleSelectNumber"
      @remove="handleRemove"
    >
      <li slot="beforeList" class="multiselect__element"> </li>
    </multiselect>
  </div>
</template>

<style>
.multiselect-custom-phone-wrap {
  width: auto;
}
.multiselect-custom-phone {
  transform: translateY(-50%);
  z-index: 999;
  left: 4px;
  top: 24px;
  height: 40px;
  width: auto;
}

.multiselect__single {
  font-size: 14px !important;
}
.multiselect__tags {
  font-size: 14px !important;
  padding-left: 5px !important;
  padding-top: 9px !important;
  width: 70px;
}
.multiselect__select {
  padding: 0 !important;
  width: 30px !important;
}

.multiselect--active {
  width: calc(100% - 6px) !important;
}

.multiselect--active > .multiselect__tags {
  font-size: 14px !important;
  padding-left: 5px !important;
  padding-top: 9px !important;
  width: calc(100% - 6px);
}

.multiselect__element {
  min-width: 100px !important;
}
</style>
<script>
import json from '@assets/json/country-phone-code.json'

export default {
  name: 'SelectPhone',
  props: {
    listNumber: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      valueSelected: {},
      currentCode: {
        country: 'Vietnam',
        text: 'Vietnam (+84)',
        number: '+84',
      },
      countryPhoneCode: json,
    }
  },
  methods: {
    handleSelectNumber(value) {
      this.valueSelected = value
      this.$emit('input', value.number)
    },

    handleRemove() {
      this.$emit('input', {})
    },

    customLabel(item) {
      if (this.currentCode.country == item.country) {
        return item.number
      }
      return item.country + `(${item.number})` || 'Select number'
    },
  },
}
</script>
