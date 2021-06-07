<template>
  <div class="notification_page pages">
    <div class="page-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 page-header-title">
            <img
              src="@/assets/img/chevron-left.svg"
              alt=""
              class="page-header_back_icon"
            />
            <span @click="$router.go(-2)" class="text">Back</span>
            <div class="page-title">
              Notification
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="card noti_list">
        <div class="card_body">
          <div data-role="container">
            <div data-role="content" class="content">
              <a
                v-for="(item, index) in notifications"
                :key="index"
                class="list-group-item"
              >
                <div class="media" @click="handelReadNoti(item)">
                  <div class="pr-10 ">
                    <img
                      :class="{ unread: item.status == 'readed' }"
                      src="~@/assets/img/dot.svg"
                      alt="dot"
                      class="icon"
                    />
                  </div>
                  <div class="media-body">
                    <div
                      class="media-heading d-flex justify-content-between align-items-center"
                    >
                      <h6
                        class="media-title"
                        :class="{ unread: item.status == 'readed' }"
                        >{{ item.title || 'Notification' }}</h6
                      >
                      <time class="media-meta">{{
                        item.created_at | datetime
                      }}</time>
                    </div>
                    <p v-html="item.message"></p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="pagination-footer">
          <p-pagination
            :total="count"
            :perPage="filter.limit"
            :current.sync="filter.page"
            size="sm"
          >
          </p-pagination>
        </div>
      </div>
    </div>
    <div class="page-footer"></div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import mixinDownload from '@/packages/shared/mixins/download'

import {
  FETCH_All_NOTIFICATIONS,
  READ_ONE_NOTIFICATIONS,
} from '../../../packages/shared/store'
export default {
  name: 'Notification',
  mixins: [mixinRoute, mixinTable, mixinDownload],
  computed: {
    ...mapState('shared', {
      notifications: (state) => state.notificationsAll,
      count: (state) => state.countNoti,
    }),
  },
  data() {
    return {
      filter: {
        limit: 10,
        page: 1,
      },
    }
  },
  methods: {
    ...mapActions('shared', [FETCH_All_NOTIFICATIONS, READ_ONE_NOTIFICATIONS]),
    handelReadNoti(item) {
      switch (item.type) {
        case 'container':
          this.callRead(item)
          this.$router
            .push({
              name: 'list-order-items',
              params: {
                id: item.object_id,
              },
            })
            .catch(() => {})
          break
        case 'billing':
          this.callRead(item)
          this.$router
            .push({
              name: 'billing-detail',
              params: {
                id: item.object_id,
              },
            })
            .catch(() => {})
          break
        case 'order':
          this.callRead(item)
          this.$router
            .push({
              name: 'list-order-items',
              params: {
                id: item.object_id,
              },
            })
            .catch(() => {})
          break
        case 'export_fulfill':
          this.callRead(item)
          this.downloadFile(
            item.message,
            'export_fulfill',
            item.message.split('/'),
            'Tracking-'
          )
          break
        default:
          this.callRead(item)
      }
    },
    async callRead(item) {
      if (item.status == 'readed') return
      const arr = []
      arr.push(item.id)
      const result = await this[READ_ONE_NOTIFICATIONS](arr)
      if (!result.success) {
        this.$toast.open({ type: 'error', message: result.message })
      }
    },
    async init() {
      this.handleUpdateRouteQuery()
      let limit = this.filter
      await this[FETCH_All_NOTIFICATIONS](limit)
    },
  },
  created() {
    this.init()
  },
  watch: {
    filter: {
      handler: function() {
        this.init()
      },
      deep: true,
    },
  },
}
</script>
