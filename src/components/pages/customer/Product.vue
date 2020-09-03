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
              <span v-if="product.id !== addCartId"
                ><font-awesome-icon :icon="['fa', 'shopping-cart']" />
                加到購物車</span
              >
              <font-awesome-icon
                icon="spinner"
                class="fa-spin"
                v-if="canAddCart && product.id === addCartId"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <Pagination
      :pageUrl="'/customer/product'"
      :pagination="pagination"
      @getSomething="getProducts"
    ></Pagination>
    <ProductCard :product="product" @addCart="addCart"></ProductCard>
  </div>
</template>

<script>
import ProductCard from '@/components/pages/customer/ProductCard';
import Pagination from '@/components/common/Pagination';

export default {
  components: {
    ProductCard,
    Pagination
  },
  data() {
    return {
      canAddCart: false,
      productId: null,
      addCartId: null,
      toShoppingCartId: null,
      pagination: {},
      products: [],
      product: {}
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts(page = 1) {
      const loader = this.$loading.show();
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/products?page=${page}`;
      const { data } = await this.$http.get(api);
      const { products, pagination } = data;
      this.products = [...products];
      this.pagination = { ...pagination };
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
      this.canAddCart = true;
      this.addCartId = id;
      const productData = { product_id: id, qty: num };
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/cart`;
      await this.$http.post(api, { data: productData });
      resolve ? resolve('') : '';
      this.$bus.$emit('showSnackbar', true, '#81C784', 5000, '已加入購物車');
      this.canAddCart = false;
      this.addCartId = null;
    }
  }
};
</script>
