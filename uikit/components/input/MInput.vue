<template>
  <div :class="wrapperClasses">
    <slot name="prepend"></slot>
    <i v-if="icon" class="prefix im" :class="`im-${icon}`"></i>

    <input
      ref="input"
      :id="uid"
      :type="internalType"
      :class="inputClasses"
      v-bind="$attrs"
      v-on="listeners"
      :value="internalValue"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
    />

    <label v-if="showLabel" :for="uid" :class="labelClasses">
      <slot>{{ label }}</slot>
    </label>

    <span v-if="password" @click="toggleTypePassword" class="toggle-password">
      <slot name="toggle-password" v-bind:type="internalType">
        {{ textBtnPassword }}
      </slot>
    </span>

    <span class="helper-text" v-for="(message, i) in displayMessages" :key="i">
      {{ message }}
    </span>

    <slot name="append"></slot>
  </div>
</template>
<script>
import FormElementMixin from '../../mixins/FormElement'
import { makeid } from '../../utils/common'

export default {
  name: 'MInput',
  inheritAttrs: false,
  mixins: [FormElementMixin],
  props: {
    value: {
      type: [String, Number],
    },
    size: {
      type: String,
      default: '',
      validator(value) {
        return ['', 'lg', 'sm'].indexOf(value) > -1
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    icon: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false,
    },
    valid: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: [String, Array],
      default: () => [],
    },
    // toggle show/hide password
    password: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    uid() {
      return this.id || makeid(5)
    },
    displayMessages() {
      if (typeof this.messages === 'object' || Array.isArray(this.messages)) {
        return this.messages
      }

      return this.messages ? [String(this.messages)] : []
    },
    wrapperClasses() {
      const classList = ['m-input-field']
      if (this.size) classList.push(`${this.size}`)
      return classList
    },
    inputClasses() {
      return {
        valid: this.valid,
        invalid: this.error && this.displayMessages.length,
      }
    },
    labelClasses() {
      return { active: !!this.internalValue || this.isFocused }
    },
    nativeValue() {
      return this.value === null || this.value === undefined ? '' : this.value
    },
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        change: this.onChange,
        blur: this.onBlur,
        focus: this.onFocus,
      }
    },
    showLabel() {
      return !this.label || this.$slots.default
    },
    textBtnPassword() {
      if (!this.options) {
        return this.internalType === 'text' ? 'hide' : 'show'
      }

      const textShow = this.options.textShowPassword || 'show'
      const textHide = this.options.textHidePassword || 'hide'
      return this.internalType === 'text' ? textHide : textShow
    },
  },
  data() {
    return {
      internalType: 'text',
      internalValue: null,
    }
  },
  mounted() {
    this.internalType = this.type
  },
  methods: {
    onInput(e) {
      this.internalValue = e.target.value
      if (this.internalValue != this.value) {
        this.$emit('input', e.target.value)
      }
    },
    onChange(e) {
      this.$emit('change', e)
    },
    toggleTypePassword() {
      if (!this.password) return
      this.internalType = this.internalType === 'text' ? 'password' : 'text'
    },
  },
  watch: {
    value: {
      handler: function() {
        this.internalValue = this.nativeValue
      },
      deep: true,
    },
  },
}
</script>
