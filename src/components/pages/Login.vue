<template>
  <div class="row align-items-center mt-3">
    <form class="form-signin" @submit.prevent="login">
      <h1 class="h3 mb-3 font-weight-normal text-center">登入管理員</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="請輸入信箱"
        v-model="user.username"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="請輸入密碼"
        v-model="user.password"
        required
      />
      <button class="btn btn-lg btn-primary btn-block " type="submit">
        <span class="text-white" v-if="canLogin === false">登入</span>
        <font-awesome-icon
          v-else-if="canLogin === true"
          icon="spinner"
          class="fa-spin"
        />
      </button>
      <span class="text-danger">{{ error }}</span>
      <div>
        <span class="text-primary">試用信箱:wheat0710@gmail.com</span><br />
        <span class="text-primary">試用密碼:wheat0710</span>
        <p>由於 Google Chrome 在後續 80 版本後會預設封鎖第三方 Cookie，就會出現無法登入的問題，如果遇到登入後，跳回到登入畫面，請重新開啟網頁點連結。 相關解決方式：
          <a href="https://hex.school/zVBbk">解決文章網址</a>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      error: '',
      canLogin: false
    };
  },
  methods: {
    async login() {
      this.canLogin = true;
      const api = `${process.env.VUE_APP_URL}/admin/signin`;
      const vm = this;
      const { data } = await this.$http.post(api, vm.user);
      if (data.success) {
        this.$bus.$emit('showSnackbar', true, '#81C784', 5000, '登入成功');
        this.$router.push('/admin/product');
      } else {
        this.$bus.$emit('showSnackbar', true, '#D32F2F', 5000, '登入失敗');
        this.error = '帳號或密碼錯誤';
      }
      this.canLogin = false;
    }
  },
  components: {}
};
</script>

<style scope>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.mt {
  margin-top: 180px;
}
</style>
