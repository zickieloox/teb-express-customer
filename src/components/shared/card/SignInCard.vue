<template>
  <md-card
    class="md-card-login md-card-auth---customize"
    :class="{ 'md-card-hidden': cardHidden }"
  >
    <md-card-header :class="getClass(headerColor)">
      <slot name="title"></slot>
      <div class="social-line">
        <slot name="buttons"></slot>
      </div>
    </md-card-header>

    <md-card-content>
      <slot name="description"></slot>
      <slot name="inputs"></slot>
    </md-card-content>

    <md-card-actions>
      <slot name="footer"></slot>
    </md-card-actions>
    <div>
      <slot name="extra"></slot>
    </div>
  </md-card>
</template>

<script>
export default {
  name: 'SignInCard',
  props: {
    headerColor: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      cardHidden: true,
    }
  },
  beforeMount() {
    setTimeout(this.showCard, 400)
  },
  methods: {
    showCard: function() {
      this.cardHidden = false
    },
    getClass: function(headerColor) {
      return `md-card-header-${headerColor}`
    },
  },
}
</script>
