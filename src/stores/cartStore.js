import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import alertStore from './alertStore';
import loadingStore from './loadingStore';

const { VITE_URL, VITE_PATH } = import.meta.env;
const { miniSwal, confirmSwal } = alertStore();
const { loadingStatus, hideLoading } = loadingStore();

export default defineStore('cartStore', {
  state: () => ({
    cart: {},
    timer: 0,
  }),
  actions: {
    async getCart() {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/cart`;
        const { data } = await axios.get(url);
        this.cart = data.data;
      } catch (error) {
        Swal.fire(error.data.message || '發生錯誤');
      } finally {
        hideLoading();
      }
    },
    async postCart(productId, qty = 1) {
      try {
        loadingStatus.productId = productId;

        const url = `${VITE_URL}/api/${VITE_PATH}/cart`;

        const data = {
          product_id: productId,
          qty,
        };

        await axios.post(url, { data });
        miniSwal('加入購物車');
        this.getCart();

        loadingStatus.productId = '';
      } catch (error) {
        Swal.fire(error.data.message || '發生錯誤');
      }
    },
    async putCart(item) {
      try {
        loadingStatus.cartId = item.id;

        const url = `${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`;

        const data = {
          product_id: item.product_id,
          qty: item.qty,
        };

        await axios.put(url, { data });
        this.getCart();

        loadingStatus.cartId = '';
      } catch (error) {
        Swal.fire(error.data.message || '發生錯誤');
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
    async delCart(cart) {
      try {
        const swal = await confirmSwal(`確定刪除 ${cart.product.title} ？`);

        if (swal.isConfirmed) {
          loadingStatus.cartId = cart.id;

          const url = `${VITE_URL}/api/${VITE_PATH}/cart/${cart.id}`;

          await axios.delete(url);
          miniSwal(`已刪除 ${cart.product.title}`);
          this.getCart();

          loadingStatus.cartId = '';
        }
      } catch (error) {
        Swal.fire(error.data.message || '發生錯誤');
      }
    },
    async delAllCart() {
      try {
        const swal = await confirmSwal('確認要清空購物車嗎？');
        if (swal.isConfirmed) {
          const url = `${VITE_URL}/api/${VITE_PATH}/carts`;

          await axios.delete(url);

          miniSwal('已清空購物車');
          this.getCart();
        }
      } catch (error) {
        Swal.fire(error.data.message || '發生錯誤');
      }
    },
  },
});
