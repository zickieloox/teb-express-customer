<template>
  <div class="row">
    <div
      class="col-xl-3 col-md-6 info-panel"
      v-for="(statistic, i) in statistics"
      :key="i"
    >
      <router-link :to="statistic.route" slot="icon">
        <statistic-card>
          <router-link :to="statistic.route" slot="icon">
            <p-button
              :icon="statistic.icon"
              icon-pack="md"
              :type="statistic.color"
              round
              raised
            >
            </p-button>
          </router-link>
          <template slot="heading">
            {{ statistic.heading }}
          </template>
          <p class="content-text text-center mb-0">
            <animated-number
              :value="statistic.value"
              class="font-size-40 font-weight-100"
            ></animated-number>
          </p>
        </statistic-card>
      </router-link>
    </div>
  </div>
</template>

<script>
import AnimatedNumber from '@components/shared/AnimatedNumber'
import StatisticCard from '@components/shared/card/StatisticCard'

export default {
  name: 'StatisticsCard',
  props: {
    statistics: {
      type: Array,
      default: () => [],
    },
    statisticOrders: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    StatisticCard,
    AnimatedNumber,
  },
}
</script>
