<template>
  <div>
    <div
      class="modal fade"
      id="productCard"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
              {{ aProduct.title }}
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
            <img :src="aProduct.image" class="img-fluid my-2" />
            <span class="font-weight-bold">課程優惠上線中</span>
            <div class="d-flex justify-content-between align-items-center my-3">
              <span class="small font-weight-bold"
                ><del>原價 {{ aProduct.origin_price }} 元</del></span
              >
              <span class="h4 font-weight-bold m-0"
                >現在只要 {{ aProduct.price }} 元</span
              >
            </div>
            <select class="form-control custom-select" v-model="aProduct.num">
              <option v-for="n in 10" :key="n" :value="n"
                >選購 {{ n }} 堂</option
              >
            </select>
          </div>
          <div class="modal-footer">
            <span class="small font-weight-bold text-muted"
              >小計 {{ aProduct.price * aProduct.num }} 元</span
            >
            <button type="button" class="btn btn-primary" @click="addCart">
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  components: {},
  props: {
    product: Object,
    default: {}
  },
  data() {
    return {
      aProduct: {},
      canOpenCart: false
    };
  },
  methods: {
    toggleCart() {
      this.canOpenCart
        ? $('#productCard').modal('show')
        : $('#productCard').modal('hide');
    },
    async addCart() {
      await new Promise(resolve =>
        this.$emit('addCart', this.aProduct.id, this.aProduct.num, resolve)
      );
      this.canOpenCart = false;
    }
  },
  watch: {
    product() {
      this.aProduct = { ...this.product, num: 1 };
      this.canOpenCart = true;
    },
    canOpenCart() {
      this.toggleCart();
    }
  }
};
</script>
