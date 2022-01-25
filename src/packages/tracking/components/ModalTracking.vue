<template>
  <!-- <p-modal class="modal-tracking" :active="visible" @close="handleClose"> -->
  <div class="modal-tracking">
    <div class="search">
      <div class="search-input">
        <div class="wrapper">
          <div class="input" id="data" @click="focusTextarea()">
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
            <div style="position: relative">
              <span class="number">{{ listCode.length + 1 }}.</span>
              <input
                id="input"
                ref="input"
                class="txt"
                type="text"
                v-model="code"
                :placeholder="
                  listCode.length > 0 ? '' : `Vui lòng nhập mã tracking,`
                "
                @keyup.enter="addCode()"
              />
            </div>
            <div
              class="placeholder"
              :class="{ hidden: isHidden }"
              v-if="listCode.length == 0"
              >Các mã được phân tách nhau bởi dấu enter</div
            >
          </div>
          <div class="showNum d-flex jc-sb" id="num">
            <div class="icon">
              <inline-svg
                style="margin-right: 8px"
                @click="clearListCode"
                :src="require('../../../../src/assets/img/delete_tracking.svg')"
              ></inline-svg>
              <inline-svg
                @click="addCode"
                :src="require('../../../../src/assets/img/format_tracking.svg')"
              ></inline-svg>
            </div>
            <div>{{ listCode.length }}/50</div>
          </div>
        </div>
      </div>
      <div class="button-group">
        <!-- <button
          class="btn btn-clear"
          :disabled="listCode.length < 1"
          @click="clearListCode"
          >Delete all</button
        > -->
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
      isHidden: false,
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
    text: {
      type: String,
      default: '',
    },
  },
  computed: {
    countCode() {
      return this.listCode.length ? this.listCode.split(/\r\n|\r|\n/).length : 0
    },
  },
  mounted() {
    this.listCode = this.codes.map((num) => num)
    var elem = document.getElementById('data')
    this.$nextTick(() => {
      elem.scrollTop = elem.scrollHeight
      this.focusTextarea()
    })
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
          this.errText = 'Số lượng mã tracking không vượt quá 50'
          this.$toast.open({ type: 'error', message: this.errText })
          return
        }
        this.listCode = [
          ...new Set(
            this.listCode.concat(
              this.code
                .toUpperCase()
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
            : 'Số lượng mã tracking không vượt quá 50'
        this.$toast.open({ type: 'error', message: this.errText })
        this.code = ''

        //scroll and focus input
        var elem = document.getElementById('data')
        this.$nextTick(() => {
          elem.scrollTop = elem.scrollHeight
        })
        this.focusTextarea()

        return
      }
      this.$emit('track', this.listCode)
      this.code = ''
      var elemData = document.getElementById('data')
      this.$nextTick(() => {
        elemData.scrollTop = elemData.scrollHeight
      })
      this.focusTextarea()
      this.$emit('update:visible', false)
    },
    clearListCode() {
      this.listCode = []
      this.code = ''
      this.focusTextarea()
      this.update('')
    },

    addCode() {
      if (this.code == '') {
        this.focusTextarea()
        return
      }

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
        this.errText = 'Số lượng mã tracking không vượt quá 50'
        this.$toast.open({ type: 'error', message: this.errText })
        return
      }
      this.listCode = [
        ...new Set(
          this.listCode.concat(
            this.code
              .toUpperCase()
              .trim()
              .split(/[\n\t ]/)
              .filter((x) => x != '')
          )
        ),
      ]
      this.update(this.listCode.toString())
      this.code = ''
      var elem = document.getElementById('data')
      this.$nextTick(() => {
        elem.scrollTop = elem.scrollHeight
      })
      this.focusTextarea()
    },
    handleRemoveCode(code) {
      let index = this.listCode.indexOf(code)
      if (index > -1) {
        this.listCode.splice(index, 1)
      }
      this.errText = ''
      this.update(this.listCode.toString())
    },

    focusTextarea() {
      document.getElementById('input').focus()
    },

    update(code) {
      this.$emit('update:text', code)
    },
  },
  watch: {
    visible: {
      handler: function() {
        if (this.visible) {
          this.$nextTick(() => this.focusTextarea())
        }
      },
      deep: true,
    },

    codes: {
      handler: function() {
        this.listCode = this.codes.map((num) => num)
        var elem = document.getElementById('data')
        this.$nextTick(() => {
          elem.scrollTop = elem.scrollHeight
        })
      },
      deep: true,
    },

    code: {
      handler: function() {
        this.isHidden = this.code == '' ? false : true

        if (this.listCode.length > 0) {
          this.update(this.listCode.toString())
        } else this.update(this.code)
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss"></style>
