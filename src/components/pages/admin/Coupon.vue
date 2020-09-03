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
          <th scope="col" width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in allCoupons" :key="coupon.id">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.code }}</td>
          <td>{{ coupon.percent / 10 }}</td>
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
    <Pagination
      :pageUrl="'/admin/coupon'"
      :pagination="pagination"
      @getSomething="getCoupons"
    ></Pagination>
    <CouponCard :coupon="coupon" @getCoupons="getCoupons"></CouponCard>
  </div>
</template>

<script>
import CouponCard from '@/components/pages/admin/CouponCard';
import Pagination from '@/components/common/Pagination';

export default {
  components: {
    CouponCard,
    Pagination
  },
  created() {
    this.getCoupons();
  },
  data() {
    return {
      removeID: '',
      pagination: {},
      coupon: {},
      allCoupons: []
    };
  },
  methods: {
    async getCoupons(page = 1, resolve = null) {
      const loader = this.$loading.show();
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/coupons?page=${page}`;
      const { data } = await this.axios.get(api);
      const { coupons, pagination } = data;
      this.allCoupons = { ...coupons };
      this.pagination = {
        ...pagination
      };
      resolve ? resolve('') : '';
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
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/coupon/${id}`;
      await this.axios.delete(api);
      this.$bus.$emit('showSnackbar', true, '#D32F2F', 5000, '已刪除');
      this.getCoupons();
    }
  }
};
</script>
