<template>
  <p-modal
    class="modal-redeem"
    :active="visible"
    title="Redeem Coins"
    @close="handleClose"
  >
    <div class="redeem-coins">
      <p class="redeem-subtitle"
        >You are have: <img src="~@/assets/contest/coin.svg" />
        <span>{{ coins }} Coins</span></p
      >
      <div class="redeem-list">
        <div class="row">
          <div class="col-6" v-for="redeem in redeemCoins" :key="redeem.coin">
            <div class="redeem-box" :class="{ disable: redeem.disable }">
              <div class="d-flex justify-content-between">
                <div class="info">
                  <div class="image">
                    <img :src="redeem.icon" />
                  </div>
                  <div>
                    <p class="price">{{ redeem.price }}$</p>
                    <p
                      ><img src="~@/assets/contest/coin.svg" />{{
                        redeem.coin
                      }}
                      coins</p
                    >
                  </div>
                </div>
                <div class="action">
                  <button
                    class="btn btn-primary"
                    @click="chooseConfirm(redeem)"
                    :disabled="redeem.disable"
                    >Redeem</button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template slot="footer">
      <a :href="pdfCoin" target="_blank">
        <img src="~@/assets/contest/learn.svg" /> About program
      </a>
    </template>
  </p-modal>
</template>
<script>
import { REDEEM_COINS } from '../../constants'

const GiftBoxIcon = require('@/assets/contest/gift-box.svg')
const GiftBoxIconDisable = require('@/assets/contest/gift-box-close.svg')

export default {
  name: 'ModalCashBack',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    coins: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
  computed: {
    redeemCoins() {
      return REDEEM_COINS.map(({ price, coin }) => {
        return {
          price,
          coin,
          disable: this.coins < coin,
          icon: this.coins < coin ? GiftBoxIconDisable : GiftBoxIcon,
        }
      })
    },
    pdfCoin() {
      return `${process.env.VUE_APP_ASSETS}/thele_xusutu.pdf`
    },
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    chooseConfirm(e) {
      this.$dialog.confirm({
        title: 'Are you sure you want to do this?',
        onConfirm: () => this.chooseHandler(e),
      })
    },
    chooseHandler(e) {
      this.$emit('on-select', e)
      this.handleClose()
    },
  },
}
</script>
