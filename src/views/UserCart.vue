<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
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
            <LoadingButton class="btn-outline-danger btn-sm"
            :loading-status="(loadingStatus.cartId === item.id)"
            @click="delCart(item)">
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
                <LoadingButton class="btn-outline-primary"
                :loading-status="(loadingStatus.cartId === item.id)"
                @click="item.qty --;debouncePutCart(item);">-</LoadingButton>
                <input min="1" type="number" class="form-control" readonly v-model="item.qty"
                >
                <LoadingButton class="btn-outline-primary"
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
  <div class="my-5 row justify-content-center">
    <VForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="postOrder">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <VField id="email" name="email" type="email" class="form-control"
        :class="{ 'is-invalid': errors['email'] }" rules="email|required"
        placeholder="請輸入 Email" v-model="user.email"></VField>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <VField id="name" name="姓名" type="text"
        class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
        placeholder="請輸入姓名" rules="required" v-model="user.name"></VField>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <VField id="tel" name="電話" type="tel"
        class="form-control" :class="{ 'is-invalid': errors['電話'] }"
        placeholder="請輸入電話" v-model="user.tel" :rules="isPhone"></VField>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <VField id="address" name="地址" type="text"
        class="form-control" :class="{ 'is-invalid': errors['地址'] }"
        placeholder="請輸入地址" rules="required" v-model="user.address"></VField>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <VField name="message" id="message" class="form-control" cols="30" rows="10"
        v-model="message" as="textarea"></VField>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">送出訂單</button>
      </div>
    </VForm>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';
import alertStore from '@/stores/alertStore';
import loadingStore from '@/stores/loadingStore';
import LoadingButton from '@/components/shared/button/LoadingButton.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      user: {},
      message: '',
    };
  },
  mounted() {
    this.showLoading();
    this.getCart();
  },
  methods: {
    isPhone(value) {
      const phoneNumber = /^(0)[0-9]{9}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
    async postOrder() {
      if (this.cart.carts.length) {
        try {
          const swal = await this.confirmSwal('確定提交訂單？');
          if (swal.isConfirmed) {
            const url = `${VITE_URL}/api/${VITE_PATH}/order`;
            const data = { user: this.user, message: this.message };
            const res = await this.$http.post(url, { data });
            this.$refs.form.resetForm();
            this.getCart();
            this.$swal(res.data.message);
          }
        } catch (error) {
          this.$swal(error.data.message || '發生錯誤');
        }
      } else {
        this.$swal('請選購商品後再提交表單');
      }
    },
    ...mapActions(alertStore, ['confirmSwal']),
    ...mapActions(loadingStore, ['showLoading']),
  },
  computed: {
    ...mapState(cartStore, ['cart', 'getCart', 'debouncePutCart', 'delCart', 'delAllCart']),
    ...mapState(loadingStore, ['loadingStatus', 'isLoading']),
  },
  components: { LoadingButton },
};
</script>
