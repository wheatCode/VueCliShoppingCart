<template>
  <div id="app">
    <router-view></router-view>
    <Snackbar></Snackbar>
    <Loading></Loading>
  </div>
</template>

<script>
import Snackbar from '@/components/common/Snackbar';
import Loading from '@/components/common/Loading';
export default {
  components: {
    Snackbar,
    Loading
  },
  async created() {},
  methods: {
    gotoIntroduce() {
      this.$router.push({ name: 'Introduce' });
    },
    goBack() {
      this.$router.forward();
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/all';
</style>
