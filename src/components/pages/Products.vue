<template>
  <div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary my-3 mr-2" @click="createProduct">
        建立新的產品
      </button>
    </div>
    <table class="table p-0 text-center">
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
          <td class="text-right">{{ product.origin_price }}</td>
          <td class="text-right">{{ product.price }}</td>
          <td>{{ product.is_enabled ? '啟用' : '未啟用' }}</td>
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
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ProductCard :product="product" @getProducts="getProducts"></ProductCard>
  </div>
</template>

<script>
import ProductCard from '@/components/common/ProductCard';

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      allProducts: [],
      product: {}
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts(resolve) {
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/products/all`;
      const { data } = await this.$http.get(api);
      const { products } = data;
      this.allProducts = { ...products };
      resolve ? resolve('') : '';
    },
    createProduct() {
      this.product = {};
    },
    editProduct(product) {
      this.product = { ...product };
    },
    async removeProduct(id) {
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/product/${id}`;
      await this.$http.delete(api);
      this.getProducts();
    }
  },
  watch: {
    products() {
      this.allProducts = { ...this.products };
    }
  }
};
</script>
<style scope></style>
