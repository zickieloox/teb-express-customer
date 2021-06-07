<template>
  <div>
    <div class="order-view-page pages">
      <div class="container">
        <div class="page-content">
          <div class="">
            <div class="">
              <div class="">
                <div class="align-items-center flex-wrap">
                  <div class="dashboard-title d-flex align-items-center">
                    <span>Get started!</span>
                  </div>
                </div>

                <div class="card-setting">
                  <img class="base-img" src="@/assets/contest/Banner.jpg" />
                  <div class="card-padding">
                    <div class="card-slide">
                      <div class="card-slide_header">
                        <h3 class="text-center">LION COIN REWARDS</h3>
                        <div class="text-center text">
                          Fulfill more Orders! Earn more Coins! Save more Costs!
                        </div>
                      </div>

                      <div>
                        <div class="row2">
                          <div class="">
                            <img
                              :src="getImgUrl(prize[level].start.icon)"
                              class="img-responsive"
                            />
                          </div>
                          <div class="">
                            <img
                              :src="getImgUrl(prize[level].end.icon)"
                              class="img-responsive"
                            />
                          </div>
                        </div>
                        <div class="statistics">
                          <div class="unit-progress">
                            <div class="progress">
                              <div
                                class="progress-bar progress-bar-extend"
                                role="progressbar"
                                :style="{
                                  width:
                                    ((currentPoint - prize[level].start.point) *
                                      100) /
                                      (prize[level].end.point -
                                        prize[level].start.point) +
                                    '%',
                                }"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                              </div>
                            </div>
                            <div
                              class="img-icon"
                              style="
                                position: absolute;
                                width: 32px;
                                top: -10px;
                                left: -20px;
                              "
                            >
                              <img src="@/assets/contest/check-circle.svg" />
                            </div>
                            <img
                              src="@/assets/contest/icon_4.png"
                              style="
                                position: absolute;
                                width: auto;
                                top: -10px;
                                right: -20px;
                              "
                            />
                            <span
                              class="unit-progress__current"
                              :style="{
                                left:
                                  ((currentPoint - prize[level].start.point) *
                                    100) /
                                    (prize[level].end.point -
                                      prize[level].start.point) +
                                  '%',
                              }"
                              ><b>{{ currentPoint | formatNumber }}</b>
                              Coins</span
                            >
                          </div>
                        </div>
                        <div class="row2">
                          <div class="col2">
                            <div class="text-center">
                              <strong class="name-item">{{
                                prize[level].start.name
                              }}</strong>
                              <br />
                              <span
                                v-if="prize[level].start.value > 0"
                                class="value-item"
                              >
                                <b>{{ prize[level].start.value }}</b>
                                Coins</span
                              >
                            </div>
                          </div>
                          <div class="col2">
                            <div class="text-center">
                              <strong class="name-item">{{
                                prize[level].end.name
                              }}</strong>
                              <br />
                              <span class="value-item">
                                <b>
                                  {{ prize[level].end.value }}
                                </b>
                                Coins</span
                              >
                            </div>
                          </div>
                        </div>
                        <p
                          v-if="currentPoint <= 10000"
                          class="statistics_desc text-center mt-24"
                        >
                          Earn {{ restCoin }} coins more to upgrade to
                          {{ prize[level].end.name }}
                          <br />
                        </p>
                        <div class="action-user">
                          <div
                            :class="{ 'role-seller': role != 'staff' }"
                            @click="handleModal"
                            class="btn btn-primary btn-cash mb-4"
                          >
                            Redeem now
                          </div>
                          <a target="_blank" :href="pdfCoin">
                            Learn more Lion coin
                            <img src="@/assets/contest/Line.svg" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-content">
                  <div class="row">
                    <div ref="card" class="col-md-8">
                      <show-card
                        :amount-slide-appear="3"
                        :products="collection"
                      ></show-card>
                      <tabs></tabs>
                    </div>
                    <div class="col-md-4">
                      <div class="blog">
                        <!--                        <carousel-->
                        <!--                          :perPage="1"-->
                        <!--                          :loop="true"-->
                        <!--                          :autoplay="true"-->
                        <!--                          :autoplayTimeout="5000"-->
                        <!--                          :paginationPosition="`top-overlay`"-->
                        <!--                        >-->
                        <!--                          <slide v-for="(item, i) in notiImage" :key="i">-->
                        <a
                          target="_blank"
                          :href="pdfTemplate"
                          class="slideNoti"
                          download="download"
                        >
                          <img
                            src="@/assets/contest/noti.svg"
                            class="slideNoti-img"
                          />
                        </a>
                        <!--                          </slide>-->
                        <!--                        </carousel>-->
                      </div>
                      <new-item :product="newProduct"></new-item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-cash-back
      @on-select="handleRedeenCoin"
      :coins="currentPoint"
      :visible.sync="isVisibleModal"
    >
    </modal-cash-back>
  </div>
</template>
<script>
import Tabs from './components/Tabs'
import ShowCard from './components/ShowCard'
import NewItem from './components/NewItem'
import ModalCashBack from './components/ModalCashBack'
import { mapState, mapActions } from 'vuex'
import {
  FETCH_POINT,
  FETCH_CONTEST_PRODUCT,
  TRANSFER_BALANCE,
} from '@/packages/dashboard/store'

export default {
  computed: {
    ...mapState('dashboard', {
      currentPoint: (state) => state.user_point,
      collection: (state) => state.productCollection,
      newProduct: (state) => state.productNew,
      role: (state) => state.user_role,
    }),
    pdfTemplate() {
      return `${process.env.VUE_APP_ASSETS}/product_package.pdf`
    },
    pdfCoin() {
      return `${process.env.VUE_APP_ASSETS}/thele_xusutu.pdf`
    },
  },
  components: {
    Tabs,
    ShowCard,
    NewItem,
    ModalCashBack,
  },
  data() {
    return {
      level: 0,
      prize: [
        {
          start: {
            point: 0,
            value: 0,
            name: 'Get started',
            icon: 'lion.svg',
          },
          end: {
            point: 500,
            value: '500 ',
            name: 'Rising Lion',
            icon: 'rising.png',
          },
        },
        {
          start: {
            point: 500,
            value: '500 ',
            name: 'Rising Lion',
            icon: 'rising.png',
          },
          end: {
            point: 2000,
            value: '2000',
            name: 'Master Lion',
            icon: 'master.png',
          },
        },
        {
          start: {
            point: 2000,
            value: '2000 ',
            name: 'Master Lion',
            icon: 'master.png',
          },
          end: {
            point: 5000,
            value: '5000',
            name: 'Genius Lion',
            icon: 'genius.png',
          },
        },
        {
          start: {
            point: 5000,
            value: '5000 ',
            name: 'Genius Lion',
            icon: 'genius.png',
          },
          end: {
            point: 8000,
            value: '8000',
            name: 'Sensei Lion',
            icon: 'sensei.png',
          },
        },
        {
          start: {
            point: 8000,
            value: '8000 ',
            name: 'Sensei Lion',
            icon: 'sensei.png',
          },
          end: {
            point: 10000,
            value: '10000',
            name: 'Guru Lion',
            icon: 'guru.svg',
          },
        },
      ],
      isVisibleModal: false,
      restCoin: 0,
      notiImage: [
        {
          img: 'gopsp.svg',
          detail: '',
        },
        {
          img: 'gopsp2.svg',
          detail: '',
        },
      ],
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.getActive(this.currentPoint)
  },
  methods: {
    ...mapActions('dashboard', [
      FETCH_POINT,
      FETCH_CONTEST_PRODUCT,
      TRANSFER_BALANCE,
    ]),
    async init() {
      const params = {
        new_product: {
          limit: 50,
          page: 1,
          category: 'New Releases',
        },
        collection: {
          limit: 50,
          page: 1,
          category: 'Summer Collection',
        },
      }
      await this[FETCH_CONTEST_PRODUCT](params)
      const result = await this[FETCH_POINT]()
      if (!result.success) {
        this.$toast.open({
          type: 'error',
          message: 'Opp!Some thing went wrong',
        })
      }
    },
    getImgUrl(name) {
      return require(`@assets/contest/${name}`)
    },
    getActive(point) {
      if (point >= 0 && point < 500) {
        return (this.level = 0)
      }
      if (point >= 500 && point < 2000) {
        return (this.level = 1)
      }
      if (point >= 2000 && point < 5000) {
        return (this.level = 2)
      }
      if (point >= 5000 && point < 8000) {
        return (this.level = 3)
      }
      if (point >= 8000 && point < 10000) {
        return (this.level = 4)
      }
      if (point >= 10000) {
        return (this.level = 4)
      }
    },
    handleRestCoin(coin, level) {
      this.restCoin = this.prize[level].end.point - coin
    },
    mapActiveSlide(curPoint) {
      let i
      for (i = 0; i < this.prize.length; i++) {
        if (
          this.prize[i].start.point <= curPoint &&
          this.prize[i].end.point > curPoint
        ) {
          return i
        }
      }
    },
    handleModal() {
      if (this.role == 'staff') {
        return
      }
      this.isVisibleModal = true
    },
    async handleRedeenCoin({ coin }) {
      const res = await this.transferBalance(coin)
      if (!res || !res.success) {
        this.$toast.open({ type: 'error', message: res.message })
        return
      }

      this.$toast.open({
        type: 'success',
        message: `Coins have been transferred to the balance.`,
      })
      this.init()
    },
  },
  watch: {
    currentPoint: {
      handler: function() {
        this.getActive(this.currentPoint)
        this.handleRestCoin(this.currentPoint, this.level)
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>

<style lang="scss">
.dashboard-step {
  cursor: pointer;
  width: 100%;
  margin-top: 16px;
  margin-left: 32px;
  background: #ffffff;
  box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.08),
    0px 0.5px 2px rgba(96, 97, 112, 0.16);
  border-radius: 8px;
  padding: 24px 56px 24px 56px;
  position: relative;
}

.dashboard-title {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  /* identical to box height, or 29px */

  /* Ink / Ink */

  color: #17191d;
}

.dashboard-title span {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  /* identical to box height, or currentPoint% */

  /* Ink / Ink */

  color: #17191d;
}

.dashboard-desc {
  margin-top: 8px;
  margin-bottom: 16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 17px */

  /* Ink / Lighter */

  color: #686b70;
}

.dashboard-step .step {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  /* Ink / Lightest */

  color: #b0b3b9;
}

.setting-img {
  top: 9%;
  left: 85%;
  position: absolute;
}

.dashboard-icon {
  top: 9%;
  left: -32px;
  border-radius: 50%;
  position: absolute;
  background: #ffffff;
  border: 8px solid #f9fafb;
  height: 64px;
  width: 64px;
}

.dashboard-icon img {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.dashboard-step .step-title {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 160%;
  /* identical to box height, or 26px */

  /* Ink / Ink */

  color: #17191d;
}

.dashboard-step .step-desc {
  margin-top: 16px;
  max-width: 680px;
  margin-bottom: 24px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  /* or 171% */

  color: #37393e;
}

.dashboard-import {
  box-shadow: none !important;
  background: #0554f2;
  border-radius: 8px !important;
  margin-right: 8px;
  line-height: 23px;
}

.dashboard-btn {
  background: #ffffff;
  border: 1px solid #dfe3e8 !important;
  box-sizing: border-box;
  border-radius: 8px !important;
  color: #37393e !important;

  &:hover {
    opacity: 0.8;
    transition: 0.3s;
  }
}

.dashboard-btn {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 23px;
  /* identical to box height, or 171% */

  text-align: center;

  color: #0554f2;
}

.card-setting {
  margin-top: 8px;
}

.unactived {
  opacity: 0.5;
}

.unactived:hover {
  opacity: 1;
}

.unactived {
  .step-desc {
    &.hiden {
      display: none;
    }
  }

  .setting-img {
    &.hiden {
      display: none;
    }
  }

  a {
    &.hiden {
      display: none;
    }
  }
}
</style>
