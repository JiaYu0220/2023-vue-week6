<template>
  <div
    id="delProductModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempProduct.title }}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <LoadingButton
            class="btn-outline-secondary"
            data-bs-dismiss="modal"
            :loading-status="loadingStatus.delProduct"
          >
            取消</LoadingButton
          >
          <LoadingButton
            class="btn-danger"
            :loading-status="loadingStatus.delProduct"
            @click="delProduct"
          >
            確認刪除</LoadingButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from 'bootstrap';
import LoadingButton from '@/components/shared/button/LoadingButton.vue';
import { mapState, mapActions } from 'pinia';
import alertStore from '@/stores/alertStore';
import loadingStore from '@/stores/loadingStore';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  components: {
    LoadingButton,
  },
  props: ['product'],
  data() {
    return {
      tempProduct: {},
      modal: null,
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
    this.tempProduct = this.product;
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },
  methods: {
    async delProduct() {
      try {
        this.loadingStatus.delProduct = true;

        const url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
        const { data } = await this.$http.delete(url);
        this.miniSwal(data.message);

        this.modal.hide();
        this.$emit('getData');

        this.loadingStatus.delProduct = false;
      } catch (error) {
        this.$swals(error.data.message);
      }
    },
    ...mapActions(alertStore, ['miniSwal']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
