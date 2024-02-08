<template>
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
            <LoadingButton :btnClass="'btn-danger'"
            :loading-status="(loadingStatus.delOrder === order.id)"
            @click="delOrder(order.id)">刪除</LoadingButton>
          </td>
      </tr>
    </tbody>
  </table>
  <PaginationComponent :pagination="pagination"></PaginationComponent>
</template>
<script>
import LoadingButton from '@/components/LoadingButton.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      orders: [],
      pagination: {},
      loadingStatus: {
        delOrder: '',
      },
    };
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    async getOrders(page = 1) {
      try {
        const loader = this.$loading.show();
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${page}`;
        const res = await this.$http.get(url);
        this.orders = res.data.orders;
        this.pagination = res.data.pagination;
        loader.hide();
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
    async delOrder(id) {
      try {
        this.loadingStatus.delOrder = id;

        const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${id}`;
        const res = await this.$http.delete(url);

        alert(res.data.message);
        this.loadingStatus.delOrder = '';

        this.getOrders();
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
    async handlePaidStatus(order) {
      try {
        const data = { ...order, is_paid: !order.is_paid };
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${order.id}`;
        await this.$http.put(url, { data });

        this.getOrders();
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
  },

  components: { LoadingButton, PaginationComponent },
};
</script>
