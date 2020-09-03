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
    <Pagination
      :pageUrl="'/admin/product'"
      :pagination="pagination"
      @getSomething="getProducts"
    ></Pagination>
    <ProductCard :product="product" @getProducts="getProducts"></ProductCard>
  </div>
</template>

<script>
import ProductCard from '@/components/pages/admin/ProductCard';
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
    async getProducts(page = 1, resolve = null) {
      const loader = this.$loading.show();
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/products?page=${page}`;
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
      this.$bus.$emit('showSnackbar', true, '#D32F2F', 5000, '已刪除');
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
<style lang="scss" scope>
.ml-30 {
  margin-left: 200px;
}
</style>
