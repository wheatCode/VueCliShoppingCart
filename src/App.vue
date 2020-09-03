<template>
  <div id="app">
    <router-view></router-view>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
import Snackbar from '@/components/common/Snackbar';

export default {
  components: {
    Snackbar
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
