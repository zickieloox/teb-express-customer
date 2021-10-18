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
    </span>
  </a>
</template>
<script>
export default {
  name: 'Copy',
  props: {
    value: [String, Number],
    texthover: {
      type: String,
      default: 'Sao chép nội dung',
    },
    textcopied: {
      type: String,
      default: 'Đã sao chép!',
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
    },
  },
}
</script>
