<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <table class="table table-striped table-bordered mt-4">
    <thead>
        <tr>
            <th>訂單編號</th>
            <th>聯絡人</th>
            <th>聯絡地址</th>
            <th>電子郵件</th>
            <th>訂單品項</th>
            <th>訂單總額</th>
            <th>訂單日期</th>
            <th>訂單狀態</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="(order, key) in orders" :key="order.id">
          <td>{{ key + 1 }}</td>
          <td>
            <p>{{ order.user.name }}</p>
            <p>{{ order.user.tel }}</p>
          </td>
          <td>{{ order.user.address }}</td>
          <td>{{ order.user.email }}</td>
          <td>
            <p v-for="(product, key) in order.products" :key="key">
            {{ `${product.product.title} * ${product.qty}` }}
            </p>
          </td>
          <td class="text-end">{{ order.total }}</td>
          <td>{{ new Date(order.create_at * 1000).toLocaleDateString() }}</td>
          <td>
            <a :class="{'text-danger': !order.is_paid}" href="#"
            @click.prevent="handlePaidStatus(order)">
              {{ order.is_paid? '已付款': '未付款' }}
            </a>
          </td>
          <td>
            <LoadingButton class="btn-danger"
            :loading-status="(loadingStatus.delOrder === order.id)"
            @click="delOrder(order.id)">刪除</LoadingButton>
          </td>
      </tr>
    </tbody>
  </table>
  <PaginationComponent :pagination="pagination"></PaginationComponent>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import LoadingButton from '@/components/shared/button/LoadingButton.vue';
import PaginationComponent from '@/components/shared/pagination/PaginationComponent.vue';
import alertStore from '@/stores/alertStore';
import loadingStore from '@/stores/loadingStore';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      orders: [],
      pagination: {},
    };
  },
  mounted() {
    this.showLoading();
    this.getOrders();
  },
  methods: {
    async getOrders(page = 1) {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${page}`;
        const res = await this.$http.get(url);
        this.orders = res.data.orders;
        this.pagination = res.data.pagination;
      } catch (error) {
        this.$swal(error.data.message || '發生錯誤');
      } finally {
        this.hideLoading();
      }
    },
    async delOrder(id) {
      try {
        const swal = await this.confirmSwal('確定要刪除此訂單嗎？');
        if (swal.isConfirmed) {
          this.loadingStatus.delOrder = id;

          const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${id}`;
          const res = await this.$http.delete(url);

          this.getOrders();
          this.miniSwal(res.data.message);
        }
      } catch (error) {
        this.$swal(error.data.message || '發生錯誤');
      } finally {
        this.loadingStatus.delOrder = '';
      }
    },
    async handlePaidStatus(order) {
      try {
        const data = { ...order, is_paid: !order.is_paid };
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${order.id}`;
        const res = await this.$http.put(url, { data });
        this.getOrders();
        this.miniSwal(res.data.message);
      } catch (error) {
        this.$swal(error.data.message || '發生錯誤');
      }
    },
    ...mapActions(alertStore, ['confirmSwal', 'miniSwal']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingStatus']),
  },
  components: { LoadingButton, PaginationComponent },
};
</script>
