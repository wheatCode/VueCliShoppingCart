<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{
            disabled: !pagination.has_pre
          }"
          @click="getProducts(previousPage, !pagination.has_pre)"
        >
          <router-link
            class="page-link"
            :to="{
              path: '/admin/product',
              query: { page: `${previousPage}` }
            }"
            aria-label="Previous"
          >
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
          <router-link
            class="page-link"
            :to="{ path: '/admin/product', query: { page: `${page}` } }"
            >{{ page }}</router-link
          >
        </li>
        <li
          class="page-item"
          :class="{
            disabled: !pagination.has_next
          }"
          @click="getProducts(nextPage, !pagination.has_next)"
        >
          <router-link
            class="page-link"
            :to="{
              path: '/admin/product',
              query: { page: `${nextPage}` }
            }"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </router-link>
        </li>
      </ul>
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
    getProducts(page, readOnly = false) {
      readOnly ? '' : this.$emit('getProducts', null, page);
    }
  },
  computed: {
    previousPage() {
      return parseInt(this.$route.query.page || 1) - 1;
    },
    nextPage() {
      return parseInt(this.$route.query.page || 1) + 1;
    }
  }
};
</script>
