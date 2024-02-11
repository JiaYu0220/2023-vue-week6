<template>
  <div class="container">
    <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
      <div class="row justify-content-center">
        <h1 class="h3 mb-3 font-weight-normal text-center">
          請先登入
        </h1>
        <div class="col-8">
          <form id="form" class="form-signin" @submit.prevent="login">
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="username"
                placeholder="name@example.com" required autofocus v-model="user.username">
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="password"
                placeholder="Password" required v-model="user.password">
              <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
              登入
            </button>
          </form>
          <button type="button" class="btn btn-link text-decoration-none"
            @click="$router.go(-1)">← 返回</button>
        </div>
      </div>
      <p class="mt-5 mb-3 text-muted">
        &copy; 2023~∞ - 六角學院
      </p>
    </div>
  </div>
</template>
<script>
const { VITE_URL } = import.meta.env;
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async login() {
      try {
        const url = `${VITE_URL}/admin/signin`;
        const { data } = await this.$http.post(url, this.user);
        const { token, expired } = data;
        document.cookie = `token=${token}; expires=${new Date(expired)}`;
        this.$router.push('/admin/products');
      } catch (error) {
        this.$swal(error.data.message || '發生錯誤');
      }
    },
  },
};
</script>
