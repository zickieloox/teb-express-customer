<template>
  <div class="dashboard-section tabs mt-24">
    <div class="dashboard-section_header">
      <p class="title">You’re off to a great start.</p>
    </div>
    <div class="dashboard-section_content">
      <ul class="nav-tab d-flex">
        <li
          class="nav-item vstep3"
          @click.prevent="setActive('import')"
          :class="{ active: isActive('import') }"
        >
          <a class="nav-link">
            <img
              v-if="isActive('import')"
              src="@assets/img/Frame-setting.svg"
            />
            <img v-else src="@assets/contest/icon.svg" />
            Import Order
          </a> </li
        ><li
          class="nav-item"
          @click.prevent="setActive('design')"
          :class="{ active: isActive('design') }"
        >
          <a class="nav-link">
            <img
              v-if="isActive('design')"
              src="@assets/img/Frame-setting (1).svg"
            />
            <img v-else src="@assets/contest/DSDeactive.svg" />
            Create Design
          </a> </li
        ><li
          class="nav-item"
          @click.prevent="setActive('map')"
          :class="{ active: isActive('map') }"
        >
          <a class="nav-link">
            <img
              v-if="isActive('map')"
              src="@assets/img/Frame-setting (2).svg"
            />
            <img v-else src="@assets/contest/mapdeactive.svg" />
            Map Your Product
          </a> </li
        ><li
          class="nav-item"
          @click.prevent="setActive('fulfill')"
          :class="{ active: isActive('fulfill') }"
        >
          <a class="nav-link">
            <img
              v-if="isActive('fulfill')"
              src="@assets/img/Frame-setting (3).svg"
            />
            <img v-else src="@assets/contest/fulfillDeactive.svg" />
            Fulfill Order
          </a>
        </li>
      </ul>
      <div class="nav-content">
        <div
          class="tab-pane fade d-flex"
          :class="{ 'active show': isActive('import') }"
        >
          <div class="tab-pane_desc">
            <div class="tab-pane_title mb-10">Import your first order</div>
            <div class="tab-pane_content mb-24">
              You can start your journey by import your order or link your store
              to your previous created store from third party platform.
            </div>
            <router-link
              class="btn btn-primary dashboard-import"
              :to="{ name: 'list-order' }"
            >
              Import your order
            </router-link>
            <router-link class="btn dashboard-btn" :to="{ name: 'link-shop' }">
              Link to store
            </router-link>
            <div class="learn mt-20">
              <a href="https://lionnix.com/products" target="_blank">
                <img src="@assets/contest/learn.svg" />
                Learn more about products
              </a>
            </div>
          </div>
          <div class="tab-pane_img">
            <img src="@assets/img/Checking boxes-cuate (3) 1.png" />
          </div>
        </div>
        <div
          class="tab-pane fade d-flex"
          :class="{ 'active show': isActive('design') }"
        >
          <div class="tab-pane_desc">
            <div class="tab-pane_title mb-10">Create Design</div>
            <div class="tab-pane_content  mb-24">
              Being an artist of your product right away by building your own
              design
            </div>
            <router-link
              class="btn-primary btn dashboard-import"
              :to="{ name: 'new-design' }"
            >
              Create your design
            </router-link>
          </div>
          <div class="tab-pane_img">
            <img src="@assets/img/Pen tool-rafiki 1.png" />
          </div>
        </div>
        <div
          class="tab-pane fade d-flex"
          :class="{ 'active show': isActive('map') }"
        >
          <div class="tab-pane_desc">
            <div class="tab-pane_title mb-10">Map Your Product</div>
            <div class="tab-pane_content  mb-24">
              Piccasso used to say: "An idea is a point of departure and no
              more. As soon as you elaborate it, it becomes transformed by
              thought. ” Lionnix will help you elaborate your design by mapping
              your design to the product of your choice.
            </div>
          </div>
          <div class="tab-pane_img">
            <img src="@assets/img/Collaboration-amico 1.png" />
          </div>
        </div>
        <div
          class="tab-pane fade d-flex"
          :class="{ 'active show': isActive('fulfill') }"
        >
          <div class="tab-pane_desc">
            <div class="tab-pane_title mb-10">Fulfill Order</div>
            <div class="tab-pane_content  mb-24">
              Let your design becomes reality! Start your fulfillment journey to
              bring your customers the product of their choices!
            </div>
          </div>
          <div class="tab-pane_img">
            <img src="@assets/img/Collaboration-rafiki 1.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tabs',
  data() {
    return {
      activeItem: 'import',
    }
  },
  methods: {
    setActive(menuItem) {
      this.activeItem = menuItem
    },
    isActive(menuItem) {
      return this.activeItem === menuItem
    },
  },
}
</script>
