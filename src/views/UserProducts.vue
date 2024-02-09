<template>
  <div class="container">
    <ul class="row row-cols-2 row-cols-md-3 g-3 list-unstyled">
      <li class="col" v-for="product in products" :key="product.id">
        <div class="card h-100">
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
            <LoadingButton class="btn-primary" @click="postCart(product.id)"
            :loading-status="(loadingStatus.productId === product.id)">
            加入購物車
            </LoadingButton>
            <button type="button" class="btn btn-secondary float-end" @click="seeMore(product)">
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
import LoadingButton from '@/components/LoadingButton.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { Modal } from 'bootstrap';
import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';

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
    async getProducts(page = 1) {
      try {
        const loader = this.$loading.show();
        const url = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}`;
        const res = await this.$http.get(url);
        this.products = res.data.products;
        this.pagination = res.data.products;
        loader.hide();
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
    seeMore(product) {
      this.tempProduct = product;
      this.modal.show();
    },
  },
  computed: {
    ...mapState(cartStore, ['loadingStatus']),
  },
};
</script>
