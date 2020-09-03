<template>
  <div>
    <div class="row justify-content-around">
      <div class="col-5">
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-if="orders.length === 0">
              <td>尚無商品</td>
            </tr>
            <tr v-else v-for="order in orders" :key="order.id">
              <td class="align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeOrder(order.id)"
                >
                  <font-awesome-icon
                    v-if="!canRemoveProduct"
                    :icon="['fa', 'trash-alt']"
                  />
                  <font-awesome-icon v-else icon="spinner" class="fa-spin" />
                </button>
              </td>
              <td class="align-middle">
                {{ order.product.title }}
                <div class="text-success" v-if="order.coupon">
                  已套用優惠券
                </div>
              </td>
              <td class="align-middle">
                {{ order.qty }}/{{ order.product.unit }}
              </td>
              <td class="align-middle text-right">{{ order.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ total }}</td>
            </tr>
            <tr v-if="!(total === final_total)">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ final_total }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm" v-if="orders.length !== 0">
          <input
            type="text"
            class="form-control"
            v-model="code"
            placeholder="請輸入優惠碼"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="useCoupon"
            >
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
      <form class="col-5" @submit.prevent="submitOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="Email"
            id="useremail"
            v-model="user.email"
            v-validate="'required|email'"
            placeholder="請輸入 Email"
            required
            :disabled="orders.length === 0"
          />
          <span v-if="errors.has('Email')" class="text-danger">
            {{ errors.first('Email') }}
          </span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            name="收件人姓名"
            id="username"
            v-model="user.name"
            v-validate="'required'"
            placeholder="輸入姓名"
            required
            :disabled="orders.length === 0"
          />
          <span v-if="errors.has('收件人姓名')" class="text-danger">
            {{ errors.first('收件人姓名') }}
          </span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            name="收件人電話"
            id="usertel"
            v-validate="'required|numeric'"
            v-model="user.tel"
            placeholder="請輸入電話"
            required
            :disabled="orders.length === 0"
          />
          <span v-if="errors.has('收件人電話')" class="text-danger">
            {{ errors.first('收件人電話') }}
          </span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            name="收件人地址"
            id="useraddress"
            v-model="user.address"
            v-validate="'required'"
            placeholder="請輸入地址"
            required
            :disabled="orders.length === 0"
          />
          <span v-if="errors.has('收件人地址')" class="text-danger">
            {{ errors.first('收件人地址') }}
          </span>
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="user.message"
            :disabled="orders.length === 0"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: '',
      total: 0,
      final_total: 0,
      canRemoveProduct: false,
      orders: [],
      user: {}
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      const loading = this.$loading.show();
      const data = await this.axios.get(
        `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/cart`
      );
      const { carts, total, final_total } = data.data.data;
      this.orders = [...carts];
      this.total = total;
      this.final_total = final_total;
      loading.hide();
    },
    async useCoupon() {
      const vm = this;
      const data = await this.axios.post(
        `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/coupon`,
        { data: { code: vm.code } }
      );
      const { success } = data;
      if (success) {
        const { final_total } = data.data;
        this.final_total = final_total;
      } else {
        this.$bus.$emit('showSnackbar', true, '#D32F2F', 5000, '沒有優惠碼');
      }
      this.code = '';
      this.getOrders();
    },
    async submitOrder() {
      const vm = this;
      await this.axios.post(
        `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/order`,
        { data: { user: vm.user } }
      );
      this.$bus.$emit('showSnackbar', true, '#81C784', 5000, '訂單建立');
      this.getOrders();
      this.user = {};
    },
    async removeOrder(id) {
      this.canRemoveProduct = true;
      await this.axios.delete(
        `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/cart/${id}`
      );
      this.$bus.$emit('showSnackbar', true, '#D32F2F', 5000, '刪除成功');
      this.canRemoveProduct = false;
      this.getOrders();
    }
  },
  components: {}
};
</script>
