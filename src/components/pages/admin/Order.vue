<template>
  <div>
    <table class="table text-center p-0 mb-0">
      <thead>
        <tr>
          <th scope="col" width="120">訂單編號</th>
          <th scope="col" width="120">購買人</th>
          <th scope="col">是否付款</th>
          <th scope="col" width="120">總共金額</th>
          <th scope="col" width="120">是否啟用</th>
          <th scope="col" width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.num }}</td>
          <td v-text="order.user.name"></td>
          <td>
            <span v-if="order.is_paid" class="text-success">已付款</span>
            <span v-else class="text-muted">未付款</span>
          </td>
          <td>{{ order.total }}</td>
          <td>
            <span v-if="coupon.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="...">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="editCoupon(coupon)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="removeCoupon(coupon.id)"
              >
                <span v-if="removeID !== coupon.id">刪除</span>
                <font-awesome-icon
                  v-else-if="removeID === coupon.id"
                  icon="spinner"
                  class="fa-spin"
                />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  async created() {
    this.getCoupons();
    this.getOrders();
  },
  data() {
    return {
      removeID: '',
      coupon: {},
      orders: [],
      allCoupons: []
    };
  },
  methods: {
    async getCoupons() {
      const loader = this.$loading.show();
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/coupons?page=1`;
      const { data } = await this.axios.get(api);
      const { coupons } = data;
      this.allCoupons = { ...coupons };
      loader.hide();
    },
    async getOrders() {
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/orders?page=1`;
      const { data } = await this.axios.get(api);
      const { orders } = data;
      this.orders = [...orders];
    },
    createCoupon() {
      this.coupon = {};
    },
    editCoupon(coupon) {
      this.coupon = { ...coupon };
    },
    async removeCoupon(id) {
      this.removeID = id;
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/coupon/${id}`;
      await this.axios.delete(api);
      this.removeID = '';
      this.getCoupons();
    }
  }
};
</script>
