<template>
  <div
    class="animsition layout-full"
    :class="$route.meta && $route.meta.class ? $route.meta.class : ''"
  >
    <div class="app container-fluid">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'FullPage',
  components: {},
  data() {
    return {
      urlSingup: 'https://help.lionnix.com/general/registration/ ',
      urlSingin: 'https://help.lionnix.com/general/sign-in/',
      urlPass: 'https://help.lionnix.com/general/password-recovery/',
    }
  },
  computed: {
    ...mapState('shared', {
      notificationMessage: (state) => state.notificationMessage,
      notificationLabel: (state) => state.notificationLabel,
    }),
  },
}
</script>
