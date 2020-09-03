<template>
  <div class="vld-parent">
    <loading
      :active.sync="isLoading"
      :can-cancel="canCancel"
      :color="color"
      :loader="loader"
      :is-full-page="true"
    ></loading>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      canCancel: false,
      color: '#6f42c1',
      loader: 'bars',
      fullPage: true
    };
  },
  created() {
    const vm = this;
    this.$bus.$on('showLoading', canShowLoading => {
      vm.showLoading(canShowLoading);
    });
  },
  methods: {
    showLoading(canShowLoading = false) {
      canShowLoading ? (this.isLoading = true) : (this.isLoading = false);
    }
  }
};
</script>
