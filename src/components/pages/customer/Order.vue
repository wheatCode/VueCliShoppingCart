<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="`backgroundImage:url(${product.image})`"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{
              product.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ product.title }}</a>
            </h5>
            <p class="card-text">內容</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.origin_price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(product.id)"
            >
              <i class="fas fa-spinner fa-spin"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i class="fas fa-spinner fa-spin"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <ProductCard :product="product" @addCart="addCart"></ProductCard>
  </div>
</template>

<script>
import ProductCard from '@/components/pages/customer/ProductCard';

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      products: [],
      product: {}
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/products/all`;
      const { data } = await this.$http.get(api);
      const { products } = data;
      this.products = [...products];
    },
    async getProduct(id) {
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/product/${id}`;
      const { data } = await this.$http.get(api);
      const { product } = data;
      this.product = { ...product };
    },
    async addCart(id, num, resolve) {
      const productData = { product_id: id, qty: num };
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/cart`;
      const { data } = await this.$http.post(api, { data: productData });
      resolve('');
      console.log(data);
    }
  }
};
</script>
