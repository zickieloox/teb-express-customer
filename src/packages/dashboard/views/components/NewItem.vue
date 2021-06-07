<template>
  <div class="section-new-item mt-24 vstep4">
    <div class="dashboard-section_header">
      <p>New realeases</p>
    </div>
    <div class="dashboard-section_content">
      <div class=" carousel-new-item">
        <div
          class="new-item-carousel "
          style="padding: 0 24px"
          v-for="(item, i) in product"
          :key="i"
        >
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
        <span>{{ index }}/{{ this.product.length }}</span>
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
  name: 'NewItem',
  props: {
    amountSlideAppear: {
      type: Number,
      default: 1,
    },
    product: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      spacing: 0,
      count: 0,
      index: 1,
    }
  },

  mounted() {
    this.caculate()
  },
  methods: {
    caculate() {
      const reviewDiv = document.querySelector('.section-new-item')
      const wrapperBox = document.querySelector('.carousel-new-item')
      const listBox = document.querySelectorAll('.new-item-carousel')
      const widthItemAndMargin = Math.floor(
        reviewDiv.offsetWidth / this.amountSlideAppear
      )
      let widthAllBox = widthItemAndMargin * this.product.length
      wrapperBox.style.width = `${widthAllBox}px`
      listBox.forEach((element) => {
        element.style.width = `${widthItemAndMargin}px`
      })
      this.spacing = widthAllBox - widthItemAndMargin * this.amountSlideAppear
    },
    right() {
      const reviewDiv = document.querySelector('.section-new-item')
      const wrapperBox = document.querySelector('.carousel-new-item')
      const widthItemAndMargin = Math.floor(
        reviewDiv.offsetWidth / this.amountSlideAppear
      )
      this.count += widthItemAndMargin
      this.index += 1
      if (this.count > this.spacing) {
        this.count = 0
        this.index = 1
      }
      wrapperBox.style.transform = `translateX(${-this.count}px)`
    },
    left() {
      const reviewDiv = document.querySelector('.section-new-item')
      const wrapperBox = document.querySelector('.carousel-new-item')
      const widthItemAndMargin = Math.floor(
        reviewDiv.offsetWidth / this.amountSlideAppear
      )
      this.count -= widthItemAndMargin
      this.index -= 1
      if (this.count < 0) {
        this.count = this.spacing
        this.index = this.product.length
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
    product: {
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
