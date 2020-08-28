<template>
  <div>
    <div
      class="modal fade bd-example-modal-sm"
      id="couponCard"
      tabindex="-1"
      role="dialog"
      @keyup.enter="submitCoupon((id = aCoupon.id || ''))"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="!aCoupon.id">新增優惠券</span>
              <span v-else>修改優惠券</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="couponName">優惠券名稱</label>
              <input
                type="text"
                class="form-control"
                id="couponName"
                v-model="aCoupon.title"
              />
            </div>
            <div class="form-group">
              <label for="fold">折數</label>
              <input
                type="text"
                class="form-control"
                id="fold"
                v-model="aCoupon.percent"
              />
            </div>
            <div class="form-group">
              <label for="promoCode">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="promoCode"
                v-model="aCoupon.code"
              />
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="enable"
                v-model="aCoupon.is_enabled"
              />
              <label class="form-check-label" for="enable">是否啟用</label>
            </div>
          </div>
          <div class="modal-footer" style="position: relative">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="submitCoupon((id = aCoupon.id || ''))"
            >
              <span v-if="isSubmit === false">確認</span>
              <font-awesome-icon
                v-else-if="isSubmit === true"
                icon="spinner"
                class="fa-spin"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger"></strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  props: {
    coupon: {
      type: Object,
      defalut: {}
    }
  },
  components: {},
  data() {
    return {
      aCoupon: {},
      isLoading: false,
      isSubmit: false
    };
  },
  methods: {
    toggleCard(canOpenCard) {
      canOpenCard
        ? $('#couponCard').modal('show')
        : $('#couponCard').modal('hide');
    },
    async submitCoupon(id) {
      this.isSubmit = true;
      this.aCoupon.due_date = Date.now();
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/coupon`;
      if (id) {
        await this.editCoupon(api, id);
      } else {
        await this.createCoupon(api);
      }
      new Promise(resolve => this.$emit('getCoupons', resolve));
      this.toggleCard(false);
      this.isSubmit = false;
    },
    async createCoupon(api) {
      const { data } = await this.$http.post(api, { data: this.aCoupon });
      console.log(data);
    },
    async editCoupon(api, id) {
      await this.$http.put(api + `/${id}`, {
        data: this.aCoupon
      });
    }
  },
  watch: {
    coupon() {
      this.aCoupon = { ...this.coupon };
      this.errors.clear();
      this.toggleCard(true);
    }
  }
};
</script>
