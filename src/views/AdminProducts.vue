<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-end">{{ product.origin_price }}</td>
          <td class="text-end">{{ product.price }}</td>
          <td>
            <span :class="{'text-success': product.is_enabled}">
            {{product.is_enabled? '': '未'}}啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', product)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm"
              @click="openModal('del', product)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponent :pagination="pagination"
    @get-data="getAdminProducts"></PaginationComponent>
  </div>
  <!-- Modal -->
  <ProductModal :product="tempProduct" :is-new="isNew" ref="productModalDom"
  @get-data="getAdminProducts"
  ></ProductModal>
  <DelProductModal :product="tempProduct" ref="delProductModalDom"
  @get-data="getAdminProducts"
  ></DelProductModal>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue';
import DelProductModal from '@/components/DelProductModal.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: {
    ProductModal,
    DelProductModal,
    PaginationComponent,
  },
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      pagination: {},
    };
  },
  mounted() {
    this.getAdminProducts();
  },
  methods: {
    async getAdminProducts(page = 1) {
      try {
        const loader = this.$loading.show();

        const url = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`;
        const { data } = await this.$http.get(url);
        this.products = data.products;
        this.pagination = data.pagination;
        loader.hide();
      } catch (error) {
        console.log(error);
        alert(error.data.message);
      }
    },
    openModal(type, item) {
      switch (type) {
        case 'new':
          this.isNew = true;
          this.tempProduct = {
            imagesUrl: [],
          };
          this.$refs.productModalDom.modal.show();
          break;
        case 'edit':
          this.isNew = false;
          this.tempProduct = item;
          this.$refs.productModalDom.modal.show();
          break;
        case 'del':
          this.tempProduct = item;
          this.$refs.delProductModalDom.modal.show();
          break;
        default:
          break;
      }
    },
  },
};
</script>
