<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{
            disabled: !pagination.has_pre
          }"
          @click="getSomething(previousPage, !pagination.has_pre)"
        >
          <router-link
            class="page-link"
            :to="{
              path: `${pageUrl}`,
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
          :class="{ active: page === currentPage }"
          v-for="page in pagination.total_pages"
          :key="page"
          @click="getSomething(page)"
        >
          <router-link
            class="page-link"
            :to="{ path: `${pageUrl}`, query: { page: `${page}` } }"
            >{{ page }}</router-link
          >
        </li>
        <li
          class="page-item"
          :class="{
            disabled: !pagination.has_next
          }"
          @click="getSomething(nextPage, !pagination.has_next)"
        >
          <router-link
            class="page-link"
            :to="{
              path: `${pageUrl}`,
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
    pageUrl: {
      type: String
    },
    pagination: {
      type: Object
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    getSomething(page, readOnly = false) {
      if (!readOnly) {
        if (this.currentPage === page) return;
        this.currentPage = page;
        this.$emit('getSomething', page);
      }
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
