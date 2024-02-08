<template>
  <div class="container">
    <h1>這是後台頁面</h1>
    <nav>
      <RouterLink to="/">回到前台</RouterLink> |
      <RouterLink to="/admin/products">產品管理</RouterLink> |
      <RouterLink to="/admin/orders">訂單管理</RouterLink>
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
        console.log('成功');
        this.checkSuccess = true;
      } catch (error) {
        console.log(error);
        alert(error.data.message);
        this.router.push('/login');
      }
    },
  },

};
</script>
