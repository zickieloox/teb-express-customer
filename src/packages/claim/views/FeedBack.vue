<template>
  <div>
    <img id="bg-fb" src="~@/assets/img/feedback.png" />
    <div class="feedback-modal">
      <p-modal
        :active="visible"
        @close="handleClose"
        :title="`Phản hồi khách hàng`"
      >
        <div class="row mb-8">
          <div class="col-5">
            <label>Tiêu đề: </label>
          </div>
          <div class="col-7">
            {{ ticket.title }}
          </div>
        </div>
        <div class="row mb-8">
          <div class="col-5">
            <label>Nội dung: </label>
          </div>
          <div class="col-7">
            {{ ticket.content }}
          </div>
        </div>
        <div class="row mb-20">
          <div class="col-5">
            <label>Người xử lý khiếu nại: </label>
          </div>
          <div class="col-7">
            Nhan CS
          </div>
        </div>
        <div class="star mb-20">
          <AwesomeVueStarRating
            :star="this.star"
            :disabled="this.disabled"
            :maxstars="this.maxstars"
            :starsize="this.starsize"
            :hasresults="this.hasresults"
            :hasdescription="this.hasdescription"
          />
        </div>
        <div style="margin-bottom: -16px;">
          <textarea
            style="position: static"
            rows="4"
            cols="50"
            class="form-control"
            placeholder="Phản hồi thêm (không bắt buộc)"
            v-model="response"
            name="message"
          ></textarea>
        </div>
        <template slot="footer">
          <p-button
            type="primary"
            @click="handleSave"
            style="margin: auto;width: 448px"
          >
            Gửi phản hồi
          </p-button>
        </template>
      </p-modal>
    </div>
  </div>
</template>

<script>
import AwesomeVueStarRating from 'awesome-vue-star-rating'
import { FETCH_TICKET } from '@/packages/claim/store'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'FeedBack',
  components: {
    AwesomeVueStarRating,
  },
  data() {
    return {
      response: '',
      star: 5,
      hasresults: false,
      hasdescription: false,
      starsize: '3x',
      maxstars: 5,
      disabled: false,
      visible: true,
    }
  },
  computed: {
    ...mapState('claim', {
      ticket: (state) => state.ticket,
    }),
    ticketID() {
      return parseInt(this.$route.params.id)
    },
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('claim', [FETCH_TICKET]),
    async init() {
      await this[FETCH_TICKET](this.ticketID)
    },
    handleSave() {},
    handleClose() {
      this.visible = false
    },
  },
}
</script>
<style>
.rating .list {
  text-align: center;
}
.feedback-modal .p-modal-content {
  width: 480px;
}
#bg-fb {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
}
.feedback-modal .modal-footer {
  border: none;
}
.feedback-modal .row {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #313232;
}
.feedback-modal .row label {
  color: #626363;
}
</style>
