<template>
  <multiselect-ver-2
    class="multiselect-custom select-action-order"
    v-model="selected"
    :options="option"
    placeholder="More actions"
    :custom-label="customLabel"
    :loading="isLoading"
    @select="handleSelect"
    @remove="handleRemove"
  >
  </multiselect-ver-2>
</template>

<style lang="scss">
.select-action-order {
  width: 130px;
  height: 34px;
  .multiselect__overlay {
    display: none !important;
  }
  .multiselect__select {
    z-index: 1;
    padding: 0;
    width: 15px;
    right: 5px;
    top: 6px;
    transform: none;
  }
  .multiselect__tags {
    padding: 0px 8px !important;
    border: none;
    background: #f9fafb;
    cursor: pointer;
    .multiselect__single,
    .multiselect__placeholder,
    .multiselect__input {
      width: 90% !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding-left: 3px !important;
      margin: 0 !important;
      font-weight: bold;
      font-size: 14px;
      line-height: 160%;
      background: #f9fafb;
      color: #17191d;
    }
  }
  .multiselect__content-wrapper {
    right: 0;
    padding: 16px 8px;
    width: 171px;
    height: 176px;
    border: 1px solid #37393e;
    border-radius: 4px;
    .multiselect__content {
      font-size: 14px;
      line-height: 160%;
      color: #17191d;
      .multiselect__element {
        height: 27px;
        margin-bottom: 1px;
        .multiselect__option {
          border-radius: 4px;
          padding: 6px 8px;
          min-height: 27px;
          &--selected {
            font-weight: normal;
            color: #17191d;
          }
        }
        &.disabled {
          color: #b0b3b9;
          .multiselect__option {
            pointer-events: none !important;
            &:hover,
            &.multiselect__option--highlight {
              background: #ffffff;
              color: #b0b3b9;
            }
          }
        }
      }
    }
  }
  &.multiselect--active {
    .multiselect__overlay {
      display: none !important;
    }
  }
}
</style>

<script>
import MultiselectVer2 from '../../../../uikit/components/multiselect-ver2/MultiselectVer2.vue'

export default {
  components: { MultiselectVer2 },
  name: 'SelectActionOrder',
  computed: {
    option() {
      const options = [
        {
          key: 'fulfill-order',
          name: 'Fulfill order',
          isDisabled: true,
        },
        {
          key: 'view-billing',
          name: 'View billing',
          isDisabled: true,
        },
        {
          key: 'cancel-order',
          name: 'Cancel order',
          isDisabled: true,
        },
        {
          key: 'resent-order',
          name: 'Resent order',
          isDisabled: true,
        },
        {
          key: 'delete-order',
          name: 'Delete order',
          isDisabled: true,
        },
      ]
      switch (this.status) {
        case 1:
          ;(options[0].isDisabled = false),
            (options[1].isDisabled = true),
            (options[2].isDisabled = false),
            (options[3].isDisabled = true),
            (options[4].isDisabled = false)
          break
        case 2:
          ;(options[0].isDisabled = true),
            (options[1].isDisabled = true),
            (options[2].isDisabled = false),
            (options[3].isDisabled = true),
            (options[4].isDisabled = true)
          break
        case 3:
        case 4:
          ;(options[0].isDisabled = true),
            (options[1].isDisabled = false),
            (options[2].isDisabled = false),
            (options[3].isDisabled = true),
            (options[4].isDisabled = true)
          break
        case 6:
          ;(options[0].isDisabled = true),
            (options[1].isDisabled = true),
            (options[2].isDisabled = true),
            (options[3].isDisabled = false),
            (options[4].isDisabled = true)
          break
        case 7:
          ;(options[0].isDisabled = true),
            (options[1].isDisabled = false),
            (options[2].isDisabled = false),
            (options[3].isDisabled = false),
            (options[4].isDisabled = true)
          break
        case 5:
        case 8:
          ;(options[0].isDisabled = true),
            (options[1].isDisabled = false),
            (options[2].isDisabled = true),
            (options[3].isDisabled = true),
            (options[4].isDisabled = true)
          break
      }

      return options
    },
  },
  props: {
    index: {
      type: Number,
      default: 1,
    },
    value: [Number, String],
    filter: {
      type: Object,
      default: () => {},
    },
    status: Number,
    isVisibleConfirmDelete: {
      type: Boolean,
      default: false,
    },
    isVisibleConfirmCancel: {
      type: Boolean,
      default: false,
    },
    isVisibleConfirmFulfil: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: {
        key: '',
        name: 'More actions',
      },
      isLoading: false,
    }
  },
  mounted() {},

  methods: {
    customLabel({ key, name }) {
      return typeof key !== 'undefined' ? `${name}` : ''
    },

    handleSelect(value) {
      switch (value.key) {
        case 'fulfill-order':
          this.$emit('fulfill')
          break
        case 'cancel-order':
          this.$emit('cancel')
          break
        case 'delete-order':
          this.$emit('delete')
          break
        case 'resent-order':
          this.$emit('resent')
          break
        case 'view-billing':
          this.$emit('viewBilling')
          break
      }
    },
    handleRemove(value) {
      return this.handleSelect(value)
    },
  },
}
</script>
