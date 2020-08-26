<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pagination.has_pre }">
          <router-link class="page-link" to="/products" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </router-link>
        </li>
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :key="page"
          @click="getProducts(page)"
        >
          <a class="page-link" href="#">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !pagination.has_next }">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
      s
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object
    }
  },
  methods: {
    getProducts(page) {
      this.$emit('getProducts', null, page);
    }
  },
  watch: {
    pagination() {
      console.log(this.pagination);
    }
  }
};
</script>
