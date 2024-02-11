<template>
  <div class="row">
    <div class="col-sm-6">
      <img class="img-fluid" :src="product.imageUrl" alt="產品圖" style="height: 500px;">
    </div>
    <div class="col-sm-6">
      <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
      <p>商品描述：{{ product.description }}</p>
      <p>商品內容：{{ product.content }}</p>
      <div class="h5" v-if="product.price === product.origin_price">
        {{ product.price }} 元
      </div>
      <template v-else>
        <del class="h6">原價 {{ product.origin_price }} 元</del>
        <div class="h5">現在只要 {{ product.price }} 元</div>
      </template>
      <div>
        <div class="input-group">
          <select class="form-select" v-model="quantity">
            <option v-for="i in 20" :key="`qty${i}`" :value="i">{{ i }}</option>
          </select>
          <LoadingButton class="btn-primary"
          :loading-status="(loadingStatus.productId === product.id)"
          @click="postCart(product.id, quantity)">
            加入購物車
          </LoadingButton>
        </div>
      </div>
    </div>
    <!-- col-sm-6 end -->
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import loadingStore from '@/stores/loadingStore';
import LoadingButton from '@/components/shared/button/LoadingButton.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      try {
        this.showLoading();
        const { id } = this.$route.params;
        const url = `${VITE_URL}/api/${VITE_PATH}/product/${id}`;
        const res = await this.$http.get(url);
        this.product = res.data.product;
      } catch (error) {
        this.$swal(error.data.message || '發生錯誤');
      } finally {
        this.hideLoading();
      }
    },
    ...mapActions(cartStore, ['postCart']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
  components: { LoadingButton },
};
</script>
