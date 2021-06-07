<template>
  <div class="dashboard-section" ref="box">
    <div class="dashboard-section_header">
      <p>Hot collections to rocket sales</p>
    </div>
    <div class="dashboard-section_content">
      <div class="carousel-contest">
        <div class="item-carousel" v-for="(item, i) in products" :key="i">
          <router-link
            :to="{
              name: 'product-base-detail',
              params: {
                id: item.id,
              },
            }"
          >
            <img :src="getImg(item.images)" />
            <div class="card-body">
              <div class="card-category">{{ item.categories }}</div>
              <div class="card-name">{{ item.name }}</div>
              <div class="card-price"> Starting from ${{ item.price }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="dashboard-section_footer">
      <div class="control-footer d-flex ">
        <a
          class="btn-floating"
          href="#"
          @click.prevent="left"
          style="text-decoration: none"
          ><i class="fa fa-chevron-left"></i>
        </a>
        <span>Summer Collection</span>
        <a
          class="btn-floating"
          href="#"
          style="text-decoration: none"
          @click.prevent="right"
          ><i class="fa fa-chevron-right"></i
        ></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShowCard',
  props: {
    amountSlideAppear: {
      type: Number,
    },
    products: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      spacing: 0,
      count: 0,
    }
  },

  mounted() {
    this.caculate()
  },
  methods: {
    caculate() {
      const reviewDiv = document.querySelector('.dashboard-section')
      const wrapperBox = document.querySelector('.carousel-contest')
      const listBox = document.querySelectorAll('.item-carousel')
      const widthItemAndMargin = Math.floor(
        reviewDiv.offsetWidth / this.amountSlideAppear
      )
      let widthAllBox = Math.floor(widthItemAndMargin) * this.products.length
      wrapperBox.style.width = `${widthAllBox}px`
      listBox.forEach((element) => {
        element.style.marginRight = '12px'
        element.style.marginLeft = '12px'
        element.style.width = `${widthItemAndMargin - 24}px`
      })
      this.spacing = widthAllBox - widthItemAndMargin * this.amountSlideAppear
    },
    right() {
      const reviewDiv = document.querySelector('.dashboard-section')
      const widthItemAndMargin = Math.floor(
        reviewDiv.offsetWidth / this.amountSlideAppear
      )
      const wrapperBox = document.querySelector('.carousel-contest')
      this.count += widthItemAndMargin
      if (this.count > this.spacing) {
        this.count = 0
      }
      wrapperBox.style.transform = `translateX(${-this.count}px)`
    },
    left() {
      const reviewDiv = document.querySelector('.dashboard-section')
      const widthItemAndMargin = Math.floor(
        reviewDiv.offsetWidth / this.amountSlideAppear
      )
      const wrapperBox = document.querySelector('.carousel-contest')
      this.count -= widthItemAndMargin

      if (this.count < 0) {
        this.count = this.spacing
      }
      wrapperBox.style.transform = `translateX(${-this.count}px)`
    },
    getImg(url) {
      if (url) {
        url = url.split('|')[0]
        return `${process.env.VUE_APP_BASE_ASSETS_IMAGE}${url}`
      }
      return ``
    },
  },
  watch: {
    products: {
      handler: function() {
        this.$nextTick(() => {
          this.caculate()
        })
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>
