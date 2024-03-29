import { defineStore } from 'pinia';

export default defineStore('loading', {
  state: () => ({
    isLoading: false,
    loadingStatus: {
      productId: '',
      cartId: '',
      delOrder: '',
      delProduct: false,
    },
  }),
  actions: {
    showLoading() {
      this.isLoading = true;
    },
    hideLoading() {
      this.isLoading = false;
    },
  },
});
