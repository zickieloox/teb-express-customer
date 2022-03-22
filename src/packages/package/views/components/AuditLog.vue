<template>
  <div>
    <div class="table-responsive">
      <table class="table table-hover" id="tbl-packages">
        <thead>
          <tr>
            <th>Thời gian</th>
            <th>Người thực hiện</th>
            <th>Loại thay đổi</th>
            <th>Nội dung cũ</th>
            <th>Nội dung mới</th>
            <th>Phí phát sinh</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in displayItems" :key="i">
            <td>{{ item.created_at | datetime('dd/MM/yyyy - HH:mm') }}</td>
            <td v-html="item.action_by"></td>
            <td>{{ item.title }}</td>
            <td>{{ item.old_value }}</td>
            <td>{{ item.value }}</td>
            <td class="text-right">{{ item.fee | formatPrice('after') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="timeline__next-page">
      <div :class="{ 'disable-next-page': !hasPerPage }" @click="prev"
        >Trước</div
      >
      <div :class="{ 'disable-next-page': !hasNextPage }" @click="next"
        >Sau</div
      >
    </div>
  </div>
</template>

<script>
import {
  CHANGE_PACKAGE_TYPE,
  ROLE_ADMIN,
  ROLE_SUPPORT,
  ROLE_ACCOUNTANT,
} from '../../constants'

export default {
  name: 'AuditLog',
  props: {
    logs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      page: 1,
      limit: 10,
    }
  },
  computed: {
    items() {
      const staffs = [ROLE_ADMIN, ROLE_SUPPORT, ROLE_ACCOUNTANT]

      return (this.logs || []).map((item) => {
        return {
          title: CHANGE_PACKAGE_TYPE[item.type] || '',
          fee: item.fee,
          value: item.value,
          old_value: item.old_value,
          created_at: item.created_at,
          action_by: staffs.includes(item.updated_user_role)
            ? 'CSKH'
            : item.updated_user_name,
        }
      })
    },
    displayItems() {
      const start = (this.page - 1) * this.limit
      let end = this.page * this.limit

      return this.items.slice(start, end)
    },
    totalPage() {
      return Math.ceil(this.items.length / this.limit)
    },
    hasNextPage() {
      return this.page < this.totalPage && this.totalPage > 1
    },
    hasPerPage() {
      return this.page > 1
    },
  },
  methods: {
    next() {
      CHANGE_PACKAGE_TYPE

      this.hasNextPage && this.page++
    },
    prev() {
      this.hasPerPage && this.page--
    },
  },
}
</script>
