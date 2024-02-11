<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <div class="container">
    <ul class="row row-cols-2 row-cols-md-3 g-3 list-unstyled">
      <li class="col" v-for="product in products" :key="product.id">
        <!-- 產品卡片 -->
        <div class="card h-100 hover-pointer" @click="clickProduct(product.id)">
          <img :src="product.imageUrl" class="card-img-top" alt="產品圖" style="height: 200px;">
          <div class="card-body">
            <h5 class="card-title">{{product.title}}</h5>
            <p class="card-text text-truncate text-secondary">{{ product.description }}</p>
            <div>
              <span class="fs-5 me-1">{{product.price !== product.origin_price? '限時優惠':''}}
               NT ${{ product.price }}</span>
              <del v-if="product.price !== product.origin_price">
                NT ${{ product.origin_price }}
              </del>
            </div>
          </div>
          <div class="p-3">
            <LoadingButton class="btn-primary" @click.stop="postCart(product.id)"
            :loading-status="(loadingStatus.productId === product.id)">
            加入購物車
            </LoadingButton>
            <button type="button" class="btn btn-secondary float-end"
            @click.stop="seeMore(product)">
              查看更多
            </button>
          </div>
        </div>
      </li>
    </ul>
    <PaginationComponent :pagination="pagination"></PaginationComponent>
  </div>
  <!-- modal -->
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{tempProduct.title}}</span>
        </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="產品圖" style="height: 500px;">
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{ tempProduct.category }}</span>
              <p>商品描述：{{ tempProduct.description }}</p>
              <p>商品內容：{{ tempProduct.content }}</p>
              <div class="h5" v-if="tempProduct.price === tempProduct.origin_price">
                {{ tempProduct.price }} 元
              </div>
              <template v-else>
                <del class="h6">原價 {{ tempProduct.origin_price }} 元</del>
                <div class="h5">現在只要 {{ tempProduct.price }} 元</div>
              </template>
              <div>
                <div class="input-group">
                  <select class="form-select" v-model="quantity">
                    <option v-for="i in 20" :key="`qty${i}`" :value="i">{{ i }}</option>
                  </select>
                  <button type="button" class="btn btn-primary"
                  @click="postCart(product.id, quantity)">
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingButton from '@/components/shared/button/LoadingButton.vue';
import PaginationComponent from '@/components/shared/pagination/PaginationComponent.vue';
import { Modal } from 'bootstrap';
import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';
import loadingStore from '@/stores/loadingStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: { LoadingButton, PaginationComponent },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      modal: '',
      quantity: 1,
    };
  },
  mounted() {
    this.getProducts();
    this.modal = new Modal(this.$refs.modal);
  },
  methods: {
    ...mapActions(cartStore, ['postCart']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    async getProducts(page = 1) {
      try {
        this.showLoading();
        const url = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}`;
        const res = await this.$http.get(url);
        this.products = res.data.products;
        this.pagination = res.data.products;
      } catch (error) {
        this.$swal(error.data.message || '發生錯誤');
      } finally {
        this.hideLoading();
      }
    },
    seeMore(product) {
      this.tempProduct = product;
      this.modal.show();
    },
    clickProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingStatus']),
  },
};
</script>
