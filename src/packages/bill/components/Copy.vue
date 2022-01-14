<template>
  <a
    class="lb-tooltip"
    :class="classList"
    :data-text-hover="texthover"
    :data-text-copied="textcopied"
  >
    <span
      @mouseleave="onmouseout"
      @click.prevent="oncopy"
      @mouseenter="onmouseenter"
    >
      <slot>
        <img src="@assets/img/copy.svg" />
      </slot>
      <slot name="text">{{ text }}</slot>
    </span>
  </a>
</template>
<script>
export default {
  name: 'Copy',
  props: {
    value: [String, Number],
    text: {
      type: String,
      default: '',
    },
    texthover: {
      type: String,
      default: 'Sao chép nội dung',
    },
    textcopied: {
      type: String,
      default: 'Đã sao chép!',
    },
    delay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      classList: [],
    }
  },
  methods: {
    onmouseout() {
      this.classList = []
    },
    onmouseenter() {
      this.classList = ['hover']
    },
    oncopy() {
      // setTimeout(function () {
      if (!this.value) return

      try {
        const textArea = document.createElement('textarea')
        textArea.value = this.value
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('Copy')
        textArea.remove()
        this.classList.push('copied')
      } catch (error) {
        console.log(error)
      }
      // }, 1000)
      // if (!this.value) return

      // try {
      //   const textArea = document.createElement('textarea')
      //   textArea.value = this.value
      //   document.body.appendChild(textArea)
      //   textArea.select()
      //   document.execCommand('Copy')
      //   textArea.remove()
      //   this.classList.push('copied')
      // } catch (error) {
      //   console.log(error)
      // }
    },
  },
  watch: {
    value: function() {
      if (this.delay) {
        this.oncopy()
      }
    },
  },
}
</script>
