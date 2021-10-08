<template>
  <div class="list-template pages">
    <div class="container">
      <div class="page-header">
        <div class="container-fluid">
          <div class="row">
            <p-button icon="chevron-left" class="btn-pure pl-0">
              <router-link :to="{ name: 'setting' }"
                >Import templates</router-link
              >
            </p-button>
          </div>
        </div>
      </div>
      <div class="page-content">
        <div class="page-header-group">
          <div class="page-header-title">View import templates</div>
          <div class="btn-group">
            <a
              href="#"
              @click.prevent="showModalCreateTemplate"
              class="btn btn-primary"
            >
              <span>Create an Import template</span>
            </a>
          </div>
        </div>
        <VclTable class="my-20" v-if="isFetching"></VclTable>
        <template v-else-if="templates.length">
          <div class="mt-24 card template-content">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <div
                    class="bulk-actions d-flex align-items-center"
                    v-if="totalSelected > 0"
                  >
                    <div class="bulk-actions__main-bar">
                      <span class="bulk-actions__selection-count">{{
                        selectionCountText
                      }}</span>
                      <p-button
                        class="bulk-actions__selection-status"
                        @click="showConfirmDelete()"
                        >Xóa bỏ</p-button
                      >
                    </div>
                  </div>
                  <tr>
                    <th width="20" class="order-select" :colspan="1">
                      <p-checkbox
                        class="order-select-checkbox"
                        :class="{ checkAll: totalSelected > 0 }"
                        :style="totalSelected > 0 && { width: 0 }"
                        :value="isAllChecked"
                        @change.native="toggleSelectAll"
                        :indeterminate="isIndeterminate"
                      ></p-checkbox>
                    </th>
                    <th
                      :class="{
                        hidden: action.selected.length > 0 || isAllChecked,
                      }"
                      >TITLE</th
                    >
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(template, index) in templates" :key="index">
                    <td width="40" class="ml-0 text-center">
                      <p-checkbox
                        v-model="action.selected"
                        :native-value="template"
                      ></p-checkbox>
                    </td>
                    <td>
                      <a
                        href="javascript:void(0)"
                        @click="showModalEditTemplate(template)"
                        >{{ template.name }}</a
                      >
                      <img
                        src="@/assets/img/default_template.png"
                        v-if="template.is_default"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="d-flex justify-content-between align-items-center"
            v-if="count > 0"
          >
            <p-pagination
              :total="count"
              :perPage.sync="filter.limit"
              :current.sync="filter.page"
              size="sm"
            ></p-pagination>
          </div>
        </template>
        <EmptySearchResult v-else title=""></EmptySearchResult>
      </div>
    </div>
    <modal-create-import-template
      :visible.sync="visibleModalCreateTemplate"
      @success="handleSuccessCreateTemplate"
    >
    </modal-create-import-template>
    <modal-edit-import-template
      :visible.sync="visibleModalEditTemplate"
      :template="selectedTemplate"
      @success="handleSuccessUpdateTemplate"
    >
    </modal-edit-import-template>
    <modal-confirm
      :visible.sync="isVisibleConfirmDelete"
      :actionConfirm="actions.delete.button"
      :description="actions.delete.Description"
      :title="actions.delete.title"
      :type="actions.delete.type"
      :link="actions.delete.link"
      @action="actionDelete"
    >
    </modal-confirm>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { VclTable } from 'vue-content-loading'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import ModalConfirm from '@components/shared/modal/ModalConfirm'
import mixinTable from '@core/mixins/table'
import mixinRoute from '@core/mixins/route'
import ModalCreateImportTemplate from '../components/ModalCreateImportTemplate'
import ModalEditImportTemplate from '../components/ModalEditImportTemplate'
import { FETCH_IMPORT_ORDER_TEMPLATES, DELETE_TEMPLATES } from '../store/index'
export default {
  name: 'list-template',
  components: {
    ModalCreateImportTemplate,
    ModalConfirm,
    VclTable,
    EmptySearchResult,
    ModalEditImportTemplate,
  },
  mixins: [mixinTable, mixinRoute],
  data() {
    return {
      filter: {
        limit: 50,
        page: 1,
        search: '',
      },
      isFetching: false,
      isVisibleConfirmDelete: false,
      visibleModalCreateTemplate: false,
      visibleModalEditTemplate: false,
      actions: {
        delete: {
          title: 'Delete comfirmation',
          button: 'Delete',
          Description: ``,
          type: 'danger',
        },
      },
      selectedTemplate: {},
    }
  },
  computed: {
    ...mapState('setting', {
      count: (state) => state.count,
      templates: (state) => state.templates,
    }),
    selectionCountText() {
      if (this.totalSelected === 1) {
        return '1 template đang được lựa chọn'
      }
      return `${this.totalSelected} templates đang được lựa chọn`
    },
    items() {
      return this.templates
    },
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  methods: {
    ...mapActions('setting', [FETCH_IMPORT_ORDER_TEMPLATES, DELETE_TEMPLATES]),
    async init() {
      this.handleUpdateRouteQuery()
      this.action.selected = []
      this.isFetching = true
      const result = await this[FETCH_IMPORT_ORDER_TEMPLATES](this.filter)
      this.isFetching = false
      if (!result.success) {
        this.$toast.open({ type: 'error', message: result.message })
      }
    },
    showConfirmDelete() {
      this.actions.delete.Description = `You are about to delete ${this.totalSelected} templates. Are you sure you want to continute?`
      this.isVisibleConfirmDelete = true
    },
    async actionDelete() {
      let params = {
        ids: this.selectedIds,
      }
      this.isVisibleConfirmDelete = false
      const result = await this[DELETE_TEMPLATES](params)
      if (!result.success) {
        this.$toast.open({
          type: 'error',
          message: result.message,
        })
        return
      }
      this.$toast.open({
        type: 'success',
        message: 'Delete import order templates success',
      })
      this.init()
    },
    showModalCreateTemplate() {
      this.visibleModalCreateTemplate = true
    },
    handleSuccessCreateTemplate() {
      this.visibleModalCreateTemplate = false
      this.$toast.open({
        type: 'success',
        message: 'Create import template success !',
      })
      this.init()
    },
    handleSuccessUpdateTemplate() {
      this.visibleModalEditTemplate = false
      this.$toast.open({
        type: 'success',
        message: 'Save import template success !',
      })
      this.init()
    },
    showModalEditTemplate(template) {
      this.selectedTemplate = template
      this.visibleModalEditTemplate = true
    },
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
