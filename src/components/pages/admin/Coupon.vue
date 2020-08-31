<template>
  <div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary my-1 mr-2" @click="createCoupon">
        建立優惠券
      </button>
    </div>
    <table class="table text-center p-0 mb-0">
      <thead>
        <tr>
          <th scope="col" width="120">優惠券名稱</th>
          <th scope="col">優惠碼</th>
          <th scope="col" width="120">幾折</th>
          <th scope="col" width="120">是否啟用</th>
          <th scope="col" width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in allCoupons" :key="coupon.id">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.code }}</td>
          <td>{{ coupon.percent / 10 }}</td>
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
    <!-- <div class="d-flex justify-content-center">
          <Pagination
            :pagination="pagination"
            @getProducts="getProducts"
          ></Pagination>
        </div> -->
    <CouponCard :coupon="coupon"></CouponCard>
  </div>
</template>

<script>
import CouponCard from '@/components/common/CouponCard';

export default {
  components: {
    CouponCard
  },
  created() {
    this.getCoupons();
  },
  data() {
    return {
      removeID: '',
      coupon: {},
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
      console.log(this.allCoupons);
      loader.hide();
    },
    createCoupon() {
      this.coupon = {};
    },
    editCoupon(coupon) {
      this.coupon = { ...coupon };
    },
    async removeCoupon(id) {
      this.removeID = id;
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/coupons/${id}`;
      const { data } = await this.axios.delete(api);
      console.log(data);
      this.getCoupons();
    }
  }
};
</script>
