<!--<template>-->
<!--  <div v-if="notificationMessage" class="noti-bar">-->
<!--    <div class="noti-bar-body" :class="`noti-bar-${notificationLabel}`">-->
<!--      <div>{{ notificationMessage }}</div>-->
<!--      <div @click.prevent="closeNotiBar" class="noti-bar-close">-->
<!--        <p-icon name="close-circle-o" iconPack="md"></p-icon>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import { mapActions, mapState } from 'vuex'-->

<!--export default {-->
<!--  name: 'Notibar',-->
<!--  props: {},-->
<!--  computed: {-->
<!--    ...mapState('shared', {-->
<!--      notificationMessage: (state) => state.notificationMessage,-->
<!--      notificationLabel: (state) => state.notificationLabel,-->
<!--    }),-->
<!--  },-->
<!--  methods: {-->

<!--    closeNotiBar() {-->
<!--      this.showNotificationMessage({})-->
<!--    },-->
<!--  },-->

<!--  watch: {-->
<!--    notificationMessage: {-->
<!--      handler: function() {-->
<!--        setTimeout(() => {-->
<!--          this.showNotificationMessage({})-->
<!--        }, 3000)-->
<!--      },-->
<!--      immediate: false,-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->
