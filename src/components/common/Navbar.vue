<template>
  <div>
    <nav
      class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
    >
      <router-link
        class="navbar-brand col-md-3 col-lg-2 mr-0 px-3"
        to="/admin/product"
        >WHEAT0710</router-link
      >
      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="nav justify-content-end px-3">
        <li
          class="nav-item d-flex align-items-center dropdown"
          v-if="$route.path === '/customer/product'"
          @click="getOrders"
        >
          <a class="nav-link" href="#" id="navbarDropdown" role="button">
            <font-awesome-icon
              :icon="['fa', 'shopping-cart']"
              class="text-white"
            />
          </a>
          <div
            class="dropdown-menu  dropdown-menu-right"
            aria-labelledby="navbarDropdown"
            id="orderMenu"
          >
            <div class="d-flex justify-content-center h3" v-if="canShowOrders">
              <font-awesome-icon icon="spinner" class="fa-spin" />
            </div>
            <div
              class="dropdown-item font-weight-bold"
              v-for="order in orders"
              v-else
              :key="order.id"
            >
              {{ order.product.title }}
              <span class="text-danger">{{ order.qty }}</span> 個 總共
              <span class="text-danger"> {{ order.total }}</span>
              元
              <button class="btn btn-link" @click="removeOrder(order.id)">
                <font-awesome-icon
                  class="text-dark"
                  :icon="['fa', 'trash-alt']"
                />
              </button>
            </div>
          </div>
        </li>
        <li class="nav-item text-nowrap">
          <a class="nav-link text-white" href="#" @click.prevent="logout"
            >登出</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      canShowOrders: false,
      orders: []
    };
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
    async getOrders() {
      this.canShowOrders = true;
      $('#orderMenu').dropdown('toggle');
      const data = await this.axios.get(
        `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/cart`
      );
      const { carts } = data.data.data;
      this.orders = [...carts];
      this.canShowOrders = false;
    },
    async removeOrder(id) {
      this.canShowOrders = true;
      await this.axios.delete(
        `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/cart/${id}`
      );
      this.getOrders();
      this.canShowOrders = false;
    }
  }
};
</script>
