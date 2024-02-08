<template>
  <div class="container">
    <header>
      <h1>前台頁面</h1>
      <nav>
        <RouterLink to="/">首頁</RouterLink> |
        <RouterLink to="/products">產品列表</RouterLink> |
        <RouterLink to="/cart">購物車</RouterLink> |
        <RouterLink to="/login">登入後台</RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>
