<template>
  <div>
    <v-snackbar
      v-model="snackbar.canShowSnackbar"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.canShowSnackbar = false">
          X
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      snackbar: {
        canShowSnackbar: false,
        color: '',
        timeout: 1,
        text: ''
      }
    };
  },
  created() {
    const vm = this;

    this.$bus.$on('showSnackbar', (canShowSnackbar, color, timeout, text) => {
      vm.showSnackbar(canShowSnackbar, color, timeout, text);
    });
  },
  methods: {
    showSnackbar(
      canShowSnackbar = false,
      color = '#81C784',
      timeout = 5000,
      text
    ) {
      this.snackbar.canShowSnackbar = canShowSnackbar;
      this.snackbar.color = color;
      this.snackbar.timeout = timeout;
      this.snackbar.text = text;
    }
  }
};
</script>
