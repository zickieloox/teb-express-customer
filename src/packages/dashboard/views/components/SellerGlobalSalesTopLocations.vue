<template>
  <div class="row">
    <div class="col-md-6">
      <table class="table">
        <tbody>
          <tr class="font-weight-700">
            <td class="pl-20">Quốc gia</td>
            <td class="text-center">Số đơn hàng</td>
            <td class="text-right">Tỷ trọng</td>
          </tr>

          <tr v-for="(item, i) in sales" :key="i">
            <td class="pl-20">{{ item.name }}</td>
            <td class="text-center">{{ item.sales }}</td>
            <td class="text-right">{{ item.percent }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-6">
      <async-world-map class="map" :data="mapData"></async-world-map>
    </div>
  </div>
</template>

<script>
import AsyncWorldMap from '@components/shared/async-world-map/AsyncWorldMap'

export default {
  name: 'TopCountries',
  components: {
    AsyncWorldMap,
  },
  props: {
    sales: {
      type: Array,
      default: () => [],
    },
    mapData: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
