<template v-if="uploading">
  <p-modal :active="visible" title="Điểm nhận - trả hàng" @close="handleClose">
    <div class="modal-map-point">
      <div class="d-flex search-location">
        <p-input
          class="mr-8"
          placeholder="Tìm kiếm theo địa điểm..."
          prefixIcon="search"
          type="search"
          v-model="search"
          :suffix-func="handleSearch"
          @keyup.enter="handleSearch"
          :clearable="true"
          @reset="handleDelete"
        >
        </p-input>
        <multiselect
          class="multiselect-city"
          :options="optionsCity"
          placeholder="Chọn thành phố"
          :custom-label="customLabel"
          v-model="city"
        >
        </multiselect>
      </div>
      <div class="list-warehouse">
        <div
          class="warehouse-item "
          v-for="(warehouse, i) in warehousesDTO"
          :key="i"
        >
          <div
            class="warehouse-item-content"
            :class="{ active: warehouse.id == isActive }"
            @click="handleActive(warehouse.id)"
          >
            <div class="warehouse-location d-flex">
              <p>{{ warehouse.address }}</p>
              <div class="dropdown-icon">
                <inline-svg
                  :src="require('@assets/img/Chevron - Down 16px.svg')"
                  v-if="isActive != warehouse.id"
                ></inline-svg>
                <inline-svg
                  :src="require('@assets/img/Chevron - Up 16px.svg')"
                  v-if="isActive == warehouse.id"
                ></inline-svg>
              </div>
            </div>
            <div class="time-open">
              <inline-svg
                :src="require('@assets/img/clock-open.svg')"
                class=""
              ></inline-svg>
              {{ warehouse.time_open }}
            </div>
            <div class="link-location" v-if="isActive == warehouse.id">
              <a :href="warehouse.link_address">
                <inline-svg
                  :src="require('@assets/img/link-location.svg')"
                  class=""
                ></inline-svg>
                {{ warehouse.address }}
              </a>
            </div>
            <div class="time-active " v-if="isActive == warehouse.id">
              <span>GIỜ HOẠT ĐỘNG</span>
              <div class="list-period row">
                <div
                  class="period col-md-4 "
                  v-for="(period, i) in warehouse.time_active"
                  :key="i"
                >
                  <p>{{ period.date }} :</p>
                  <p>{{ period.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </p-modal>
</template>
<style></style>

<script>
import {
  FETCH_WAREHOUSES,
  GET_WAREHOUSES,
} from '../../../packages/shared/store'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ModalMapPoint',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      city: '',
      optionsCity: [],
      isActive: 0,
      uploading: true,
      search: '',
      warehousesDTO: [],
    }
  },

  mounted() {
    this.init()
  },
  computed: {
    ...mapGetters('shared', {
      warehouses: GET_WAREHOUSES,
    }),
  },
  methods: {
    ...mapActions('shared', [FETCH_WAREHOUSES]),
    handleClose() {
      this.$emit('update:visible', false)
    },

    customLabel({ name }) {
      return name
    },

    handleActive(id) {
      if (this.isActive == id) {
        this.isActive = 0
      } else {
        this.isActive = id
      }
    },

    async init() {
      let payload = { type: 2, status: 1 }
      const result = await this[FETCH_WAREHOUSES](payload)
      if (!result.success) {
        this.$toast.open({ message: result.message, type: 'error' })
        return
      }

      let options = []

      this.warehouses.forEach((warehouse) => {
        options.push({ name: warehouse.city })
      })

      options = options.concat(this.optionsCity)

      this.optionsCity = options

      this.warehousesDTO = this.warehouses
    },

    handleSearch() {
      this.warehousesDTO = this.warehouses.filter((warehouse) =>
        this.validSearch(warehouse.address).includes(this.search.toUpperCase())
      )
      if (this.city != '') {
        this.warehousesDTO = this.warehouses.filter((warehouse) =>
          this.validSearch(warehouse.city).includes(this.city.toUpperCase())
        )
      }
    },

    validSearch(text) {
      let correct = text.trim().toUpperCase()
      correct = correct.replace(/ +(?= )/g, '')
      return correct
    },

    handleDelete() {
      this.search = ''
      this.handleSearch()
    },
  },
  watch: {
    city: {
      handler: function() {
        this.handleSearch()
      },
      deep: true,
    },
  },
}
</script>
