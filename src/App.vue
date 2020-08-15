<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
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
