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
          <div class="modal-header bg-dark text-white" id="couponTop">
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
                :class="{ 'is-invalid': errors.has('優惠券名稱') }"
                id="couponName"
                name="優惠券名稱"
                placeholder="請輸入優惠券名稱"
                v-validate="'required'"
                v-model="aCoupon.title"
              />
              <span v-if="errors.has('優惠券名稱')" class="text-danger">
                {{ errors.first('優惠券名稱') }}</span
              >
            </div>
            <div class="form-group">
              <label for="fold">折數</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.has('折數') }"
                id="fold"
                name="折數"
                placeholder="請輸入折數"
                v-validate="'required'"
                v-model="aCoupon.percent"
              />
              <span v-if="errors.has('折數')" class="text-danger">
                {{ errors.first('折數') }}</span
              >
            </div>
            <div class="form-group">
              <label for="promoCode">優惠碼</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.has('優惠碼') }"
                id="promoCode"
                name="優惠碼"
                placeholder="請輸入優惠碼"
                v-validate="'required'"
                v-model="aCoupon.code"
              />
              <span v-if="errors.has('優惠碼')" class="text-danger">
                {{ errors.first('優惠碼') }}</span
              >
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
    ></div>
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
      await this.$validator.validate().then(async result => {
        if (result) {
          this.aCoupon.due_date = Date.now();
          const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/coupon`;
          if (id) {
            await this.editCoupon(api, id);
          } else {
            await this.createCoupon(api);
          }
          new Promise(resolve =>
            this.$emit('getCoupons', this.$route.query.page, resolve)
          );
          this.toggleCard(false);
        } else {
          document.getElementById('couponTop').scrollIntoView();
        }
        this.isSubmit = false;
      });
    },
    async createCoupon(api) {
      await this.$http.post(api, { data: this.aCoupon });
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
