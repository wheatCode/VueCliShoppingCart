<template>
  <div>
    <table class="table text-center p-0 mb-0">
      <thead>
        <tr>
          <th scope="col">訂單編號</th>
          <th scope="col">購買人</th>
          <th scope="col">是否付款</th>
          <th scope="col">總共金額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.num }}</td>
          <td>{{ order.user ? order.user.name : '無名氏' }}</td>
          <td>
            <span v-if="order.is_paid" class="text-success">已付款</span>
            <span v-else class="text-muted">未付款</span>
          </td>
          <td>{{ order.total }}</td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :pageUrl="'/admin/order'"
      :pagination="pagination"
      @getSomething="getOrders"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/common/Pagination';

export default {
  components: {
    Pagination
  },
  created() {
    this.getOrders();
  },
  data() {
    return {
      removeID: '',
      pagination: {},
      orders: []
    };
  },
  methods: {
    async getOrders(page = 1) {
      this.$bus.$emit('showLoading', true);
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/orders?page=${page}`;
      const { data } = await this.axios.get(api);
      const { orders, pagination } = data;
      this.orders = [...orders];
      this.pagination = {
        ...pagination
      };
      console.log(this.orders);
      this.$bus.$emit('showLoading', false);
    }
  }
};
</script>
