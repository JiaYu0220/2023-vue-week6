import { defineStore } from 'pinia';
import axios from 'axios';
// import { debounce } from 'lodash';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('cartStore', {
  state: () => ({
    cart: {},
    loadingStatus: {
      productId: '',
      cartId: '',
    },
    timer: 0,
  }),
  actions: {
    async getCart() {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/cart`;
        const { data } = await axios.get(url);
        this.cart = data.data;
        console.log(this.cart);
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
    async postCart(productId, qty = 1) {
      try {
        this.loadingStatus.productId = productId;

        const url = `${VITE_URL}/api/${VITE_PATH}/cart`;

        const data = {
          product_id: productId,
          qty,
        };

        await axios.post(url, { data });
        alert('加入購物車');
        this.getCart();

        this.loadingStatus.productId = '';
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
    async putCart(item) {
      try {
        this.loadingStatus.cartId = item.id;

        const url = `${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`;

        const data = {
          product_id: item.product_id,
          qty: item.qty,
        };

        await axios.put(url, { data });
        this.getCart();

        this.loadingStatus.cartId = '';
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
    debouncePutCart(item) {
      // 如果在指定秒數內事件再次觸發，就會取消之前的計時器並設置一個新的計時器
      clearTimeout(this.timer);

      // 當指定秒數內沒有新的事件觸發時，即呼叫實際的事件處理函式 func
      this.timer = setTimeout(() => {
        this.putCart(item);
      }, 300);
    },
    async delCart(cartId) {
      try {
        this.loadingStatus.cartId = cartId;

        const url = `${VITE_URL}/api/${VITE_PATH}/cart/${cartId}`;

        await axios.delete(url);
        alert('已刪除該品項');
        this.getCart();

        this.loadingStatus.cartId = '';
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
    async delAllCart() {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/carts`;

        await axios.delete(url);
        alert('已清空購物車');
        this.getCart();
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
  },
});
