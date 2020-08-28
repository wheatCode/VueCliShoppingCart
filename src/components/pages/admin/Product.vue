<template>
  <div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary my-1 mr-2" @click="createProduct">
        建立新的產品
      </button>
    </div>
    <table class="table text-center p-0 mb-0">
      <thead>
        <tr>
          <th scope="col" width="100">分類</th>
          <th scope="col">商品名稱</th>
          <th scope="col" width="120">原價</th>
          <th scope="col" width="120">售價</th>
          <th scope="col" width="100">是否啟用</th>
          <th scope="col" width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in allProducts" :key="product.id">
          <th>{{ product.category }}</th>
          <td>{{ product.title }}</td>
          <td class="text-right">
            {{ product.origin_price | thousands }}
          </td>
          <td class="text-right">{{ product.price | thousands }}</td>
          <td>
            <span v-if="product.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="...">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click="editProduct(product)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="removeProduct(product.id)"
              >
                <span v-if="removeID !== product.id">刪除</span>
                <font-awesome-icon
                  v-else-if="removeID === product.id"
                  icon="spinner"
                  class="fa-spin"
                />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <Pagination
        :pagination="pagination"
        @getProducts="getProducts"
      ></Pagination>
    </div>
    <ProductCard :product="product" @getProducts="getProducts"></ProductCard>
  </div>
</template>

<script>
import ProductCard from '@/components/common/ProductCard';
import Pagination from '@/components/common/Pagination';

export default {
  components: {
    ProductCard,
    Pagination
  },
  data() {
    return {
      allProducts: [],
      pagination: {},
      product: {},
      removeID: ''
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts(resolve = null, page) {
      const loader = this.$loading.show();
      const api = `${process.env.VUE_APP_URL}/api/${
        process.env.VUE_APP_API_PATH
      }/admin/products?page=${page || this.$route.query.page || 1}`;
      const { data } = await this.$http.get(api);
      const { success } = data;
      !success ? this.$router.push('/login') : '';
      const { products, pagination } = data;
      this.allProducts = [...products];
      this.pagination = {
        ...pagination
      };
      resolve ? resolve('') : '';
      loader.hide();
    },
    createProduct() {
      this.product = {};
    },
    editProduct(product) {
      this.product = {
        ...product
      };
    },
    async removeProduct(id) {
      this.removeID = id;
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/product/${id}`;
      await this.$http.delete(api);
      this.getProducts();
    }
  },
  filters: {
    thousands(num) {
      num = '$' + String(num).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      return num;
    }
  }
};
</script>
