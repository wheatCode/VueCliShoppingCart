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
              {{ product.title }}
            </h5>
            <p class="card-text">內容</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(product.id)"
            >
              <font-awesome-icon
                icon="spinner"
                class="fa-spin"
                v-if="product.id === productId"
              />
              <span v-else>
                查看更多
              </span>
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addCart(product.id)"
            >
              <font-awesome-icon :icon="['fa', 'shopping-cart']" />
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
      product: {},
      productId: null,
      toShoppingCartId: null
    };
  },
  created() {
    console.log(this);
    this.getProducts();
  },
  methods: {
    async getProducts() {
      const loader = this.$loading.show();
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/products/all`;
      const { data } = await this.$http.get(api);
      const { products } = data;
      this.products = [...products];
      loader.hide();
    },
    async getProduct(id) {
      this.productId = id;
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/product/${id}`;
      const { data } = await this.$http.get(api);
      const { product } = data;
      this.product = { ...product };
      this.productId = null;
    },
    async addCart(id, num = 1, resolve = null) {
      const productData = { product_id: id, qty: num };
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/cart`;
      await this.$http.post(api, { data: productData });
      resolve ? resolve('') : '';
    }
  }
};
</script>
