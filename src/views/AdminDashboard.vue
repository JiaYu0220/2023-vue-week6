<template>
  <div class="container">
    <h1>這是後台頁面</h1>
    <nav>
      <RouterLink to="/">回到前台</RouterLink> |
      <RouterLink to="/admin/products">產品管理</RouterLink> |
      <RouterLink to="/admin/orders">訂單管理</RouterLink> |
      <a href="#" @click.prevent="logout">登出</a>
    </nav>
    <RouterView v-if="checkSuccess"/>
  </div>
</template>

<script>
const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      checkSuccess: false,
    };
  },
  mounted() {
    const jiayuToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];
    this.$http.defaults.headers.common.Authorization = jiayuToken;
    this.checkout();
  },
  methods: {
    async checkout() {
      try {
        const url = `${VITE_URL}/api/user/check`;
        await this.$http.post(url);
        this.checkSuccess = true;
      } catch (error) {
        this.$swal('請再登入一次');
        this.$router.push('/login');
      }
    },
    async logout() {
      try {
        const url = `${VITE_URL}/logout`;
        await this.$http.post(url);
        this.$swal('登出成功');
        this.$router.push('/login');
      } catch (error) {
        this.$swal('登出失敗，請在試一次');
      }
    },
  },

};
</script>
