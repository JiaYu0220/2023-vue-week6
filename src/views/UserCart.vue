<template>
  <template v-if="cart.carts && cart.carts.length">
    <div class="text-end">
    <button class="btn btn-outline-danger" type="button" @click="delAllCart">清空購物車</button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 200px">數量</th>
        <th>單位</th>
        <th style="width: 150px">單價</th>
        <th style="width: 150px">小計</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <LoadingButton class="'btn-outline-danger btn-sm'"
            :loading-status="(loadingStatus.cartId === item.id)"
            @click="delCart(item.id)">
              <i class="fas fa-spinner fa-pulse"></i>
              x
            </LoadingButton>
          </td>
          <td>
            {{ item.product.title }}
            <div class="text-success" v-if="item.coupon">
              已套用優惠券
            </div>
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <LoadingButton :class="'btn-outline-primary'"
                :loading-status="(loadingStatus.cartId === item.id)"
                @click="item.qty --;debouncePutCart(item);">-</LoadingButton>
                <input min="1" type="number" class="form-control" readonly v-model="item.qty"
                >
                <LoadingButton :class="'btn-outline-primary'"
                :loading-status="(loadingStatus.cartId === item.id)"
                @click="item.qty ++;debouncePutCart(item);">+</LoadingButton>
              </div>
            </div>
          </td>
          <td>
            {{ item.product.unit }}
          </td>
          <td class="text-end">
            <small class="text-success"
            v-if="item.product.price === item.product.origin_price">
              折扣價：
            </small>
            {{ item.product.price }}
          </td>
          <td class="text-end">
            {{ item.final_total}}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="5" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr>
        <td colspan="5" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>
  </template>
  <template v-else>
    <p class="bg-light p-5 text-center fs-5">購物車沒有項目</p>
  </template>
</template>
<script>
import { mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import LoadingButton from '@/components/LoadingButton.vue';

export default {
  mounted() {
    this.getCart();
  },
  computed: {
    ...mapState(cartStore, ['cart', 'getCart', 'debouncePutCart', 'loadingStatus', 'delCart', 'delAllCart']),
  },
  components: { LoadingButton },
};
</script>
