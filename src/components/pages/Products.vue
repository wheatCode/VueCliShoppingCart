<template>
  <div>
    <Dashboard></Dashboard>
  </div>
</template>

<script>
import Dashboard from '@/components/common/Dashboard';

export default {
  async created() {
    const api = `https://vue-course-api.hexschool.io/api/vanilla/admin/products/all`;
    const { data } = await this.$http.get(api);
    console.log(data);
  },
  components: {
    Dashboard
  }
};
</script>
