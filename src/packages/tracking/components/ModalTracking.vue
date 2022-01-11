<template>
  <!-- <p-modal class="modal-tracking" :active="visible" @close="handleClose"> -->
  <div class="modal-tracking">
    <div class="search">
      <div class="search-input">
        <div class="wrapper">
          <div class="input" id="data">
            <template v-for="(code, j) in listCode">
              <span
                :key="j"
                class="txt"
                type="default"
                name="plus"
                size="sm"
                v-if="code"
              >
                <span class="number">{{ j + 1 }}.</span>
                <span>{{ code }}</span>
                <i class="fa fa-times" @click="handleRemoveCode(code)"></i>
              </span>
            </template>
            <input
              id="input"
              ref="input"
              class="txt"
              type="text"
              v-model="code"
              :placeholder="`Vui lòng nhập mã tracking`"
              @keyup.enter="addCode()"
            />
          </div>
          <div class="showNum" id="num">{{ listCode.length }}/50</div>
        </div>
      </div>
      <div class="button-group">
        <button
          class="btn btn-clear"
          :disabled="listCode.length < 1"
          @click="clearListCode"
          >Delete all</button
        >
        <button class="btn btn-tracking" @click.prevent="verifyCode">
          <img src="~@/assets/img/box-search.png" alt="" /> Track</button
        >
      </div>
    </div>
  </div>
  <!-- </p-modal> -->
</template>
<script>
export default {
  name: 'ModalTracking',
  data() {
    return {
      listCode: [],
      code: '',
      limit: 50,
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    codes: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    countCode() {
      return this.listCode.length ? this.listCode.split(/\r\n|\r|\n/).length : 0
    },
  },
  mounted() {
    this.listCode = this.codes.map((num) => num)
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    verifyCode() {
      if (this.code != '') {
        const i = this.listCode.some((element) => this.code === element)
        if (i) {
          this.errText = 'Mã tracking đã tồn tại!'
          this.$toast.open({ type: 'error', message: this.errText })
          return
        }
        var regex = /^[A-Za-z0-9\n\t ]+$/
        var isValid = regex.test(this.code.trim())
        if (!isValid) {
          this.errText = 'Mã tracking không hợp lệ'
          this.$toast.open({ type: 'error', message: this.errText })
          return
        }
        if (this.listCode.length == this.limit) {
          this.errText = 'Vượt quá số lượng mã tracking cho phép'
          this.$toast.open({ type: 'error', message: this.errText })
          return
        }
        this.listCode = [
          ...new Set(
            this.listCode.concat(
              this.code
                .trim()
                .split(/[\n\t ]/)
                .filter((x) => x != '')
            )
          ),
        ]
      }
      if (this.listCode.length < 1 || this.listCode.length > this.limit) {
        this.errText =
          this.listCode.length < 1
            ? 'Vui lòng nhập mã tracking'
            : 'Vượt quá số lượng mã tracking cho phép'
        this.$toast.open({ type: 'error', message: this.errText })
        this.code = ''

        return
      }
      this.$emit('track', this.listCode)
      this.code = ''
      this.$emit('update:visible', false)
    },
    clearListCode() {
      this.listCode = []
      this.code = ''
    },

    addCode() {
      const i = this.listCode.some((element) => this.code === element)
      if (i) {
        this.errText = 'Mã tracking đã tồn tại!'
        this.$toast.open({ type: 'error', message: this.errText })
        return
      }
      var regex = /^[A-Za-z0-9\n ]+$/
      var isValid = regex.test(this.code.trim())
      if (!isValid) {
        this.errText = 'Mã tracking không hợp lệ'
        this.$toast.open({ type: 'error', message: this.errText })
        return
      }
      if (this.listCode.length == this.limit) {
        this.errText = 'Vượt quá số lượng mã tracking cho phép'
        this.$toast.open({ type: 'error', message: this.errText })
        return
      }
      this.listCode = [
        ...new Set(
          this.listCode.concat(
            this.code
              .trim()
              .split(/[\n\t ]/)
              .filter((x) => x != '')
          )
        ),
      ]
      this.code = ''
      var elem = document.getElementById('data')
      this.$nextTick(() => {
        elem.scrollTop = elem.scrollHeight
      })
    },
    handleRemoveCode(code) {
      let index = this.listCode.indexOf(code)
      if (index > -1) {
        this.listCode.splice(index, 1)
      }
      this.errText = ''
    },
  },
  watch: {
    visible: {
      handler: function() {
        this.code = ''
        this.listCode = this.codes.map((num) => num)
        if (this.visible) {
          this.$nextTick(() => document.getElementById('input').focus())
        }
      },
      deep: true,
    },

    codes: {
      handler: function() {
        this.listCode = this.codes.map((num) => num)
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss"></style>
