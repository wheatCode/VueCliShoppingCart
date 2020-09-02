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
          <div class="dropdown" id="showShoppingCart">
            <button
              type="button"
              class="btn btn-dark"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <font-awesome-icon
                :icon="['fa', 'shopping-cart']"
                class="text-white"
              />
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <div
                class="dropdown-item font-weight-bold"
                v-if="orders.length === 0 && !canShowOrders"
              >
                尚無商品
              </div>
              <div
                class="d-flex justify-content-center h3"
                v-if="canShowOrders"
              >
                <font-awesome-icon icon="spinner" class="fa-spin" />
              </div>
              <div
                class="dropdown-item font-weight-bold d-flex justify-content-between align-items-center pl-2 pr-0"
                v-for="order in orders"
                v-else
                @click.stop
                :key="order.id"
              >
                <span>{{ order.product.title }}</span>
                <span class="text-danger ml-2 mr-1">{{ order.qty }}</span> 個
                總共
                <span class="text-danger mx-2">{{ order.total }}</span>
                元
                <button class="btn btn-link" @click="removeOrder(order.id)">
                  <font-awesome-icon
                    class="text-dark"
                    :icon="['fa', 'trash-alt']"
                  />
                </button>
              </div>
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
  created() {},
  methods: {
    logout() {
      this.$emit('logout');
    },
    async getOrders() {
      const vm = this;
      await $('#showShoppingCart').on('show.bs.dropdown', async function() {
        vm.canShowOrders = true;
        const data = await vm.axios.get(
          `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/cart`
        );
        const { carts } = data.data.data;
        vm.orders = [...carts];
        vm.canShowOrders = false;
      });
      vm.canShowOrders = true;
      const data = await vm.axios.get(
        `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/cart`
      );
      const { carts } = data.data.data;
      vm.orders = [...carts];
      vm.canShowOrders = false;
    },
    async removeOrder(id) {
      this.canShowOrders = true;
      await this.axios.delete(
        `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/cart/${id}`
      );
      await this.getOrders();
      this.canShowOrders = false;
    }
  }
};
</script>
