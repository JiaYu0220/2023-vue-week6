<template>
  <div id="productModal" ref="modal" class="modal fade"
        tabindex="-1" aria-labelledby="productModalLabel"
        aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>{{ isNew ? '新增' : '編輯' }}產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
          <!-- 左 -->
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">請選擇圖片</label>
                  <input type="file" accept=".png, .jpg, .jpeg" id="imageUrl"
                          ref="imageFile" @change="uploadImg($event)">
                  <input type="text" class="form-control"
                          placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                </div>
                <img class="img-fluid" v-if="tempProduct.imageUrl"
                      :src="tempProduct.imageUrl" alt="產品圖">
              </div>
              <!-- 圖片 array -->
              <label for="imagesUrl" class="form-label">請選擇圖片(可選多圖)</label>
              <input class="mb-2 form-control" type="file"
                      accept=".png, .jpg, .jpeg" id="imagesUrl"
                      ref="imageFile" @change="uploadMultiImg($event)" multiple
                      :disabled="loadingStatus.imagesUrl">

              <template v-if="Array.isArray(tempProduct.imagesUrl)">
                <div class="mb-2" v-for="(image, key) in tempProduct.imagesUrl"
                      :key="`image${key}`">
                  <div class="mb-3 d-flex align-items-center">
                    <button type="button" class="btn-close" aria-label="Close"
                            v-if="tempProduct.imagesUrl[key]"
                            @click="tempProduct.imagesUrl.splice(key, 1)"></button>
                    <input type="text" class="form-control"
                            placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[key]">
                  </div>
                  <img class="img-fluid" v-if="image" :src="image" alt="產品圖">
                </div>
              </template>
              <div class="d-flex justify-content-center" v-if="loadingStatus.imagesUrl">
                <div class="spinner-border my-5" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <button class="btn btn-outline-primary btn-sm d-block w-100"
                      :disabled="loadingStatus.imagesUrl"
                      v-if="!tempProduct.imagesUrl ||
                      tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]"
                      @click="tempProduct.imagesUrl.push('')">
                      新增圖片
              </button>
            </div>
            <!-- 右 -->
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                        v-model = tempProduct.title>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control"
                          placeholder="請輸入分類" v-model = tempProduct.category>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                          v-model = tempProduct.unit>
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0"
                          class="form-control" placeholder="請輸入原價"
                          v-model.number = tempProduct.origin_price>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control"
                          placeholder="請輸入售價" v-model.number = tempProduct.price>
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control"
                          placeholder="請輸入產品描述" v-model="tempProduct.description">
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="description" type="text" class="form-control"
                          placeholder="請輸入說明內容" v-model="tempProduct.content">
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox"
                          :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <LoadingButton class="btn-outline-secondary" data-bs-dismiss="modal"
          :loading-status="loadingStatus.updateProduct">
          取消</LoadingButton>
          <LoadingButton class="btn-primary"
          :loading-status="loadingStatus.updateProduct" @click="updateProduct">
          確認</LoadingButton>
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
  props: ['product', 'isNew'],
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
    async uploadImg(event) {
      try {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file-to-upload', file);
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/upload`;
        const { data } = await this.$http.post(url, formData);
        this.tempProduct.imageUrl = data.imageUrl;
      } catch (error) {
        this.$swal(error.data.message);
      }
    },
    async uploadMultiImg(event) {
      try {
        this.loadingStatus.imagesUrl = true;

        const { files } = event.target;
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/upload`;

        // 多個圖片的 promise
        const promiseArr = Object.values(files).map(async (file) => {
          const formData = new FormData();
          formData.append('file-to-upload', file);
          const response = await this.$http.post(url, formData);
          return response.data.imageUrl;
        });

        // axios
        const resArr = await Promise.all(promiseArr);
        this.tempProduct.imagesUrl.push(...resArr);

        // 清空
        const targetInput = event.target;
        targetInput.value = ''; // 不能直接改 event.target.value

        this.loadingStatus.imagesUrl = false;
      } catch (error) {
        this.$swal(error.data.message);
      }
    },
    async updateProduct() {
      try {
        this.loadingStatus.updateProduct = true;

        let url = `${VITE_URL}/api/${VITE_PATH}/admin/product`;
        let http = 'post';
        if (!this.isNew) {
          url += `/${this.tempProduct.id}`;
          http = 'put';
        }
        const res = await this.$http[http](url, { data: this.tempProduct });
        this.modal.hide();
        this.$emit('getData');

        this.miniSwal(res.data.message);
        this.loadingStatus.updateProduct = false;
      } catch (error) {
        this.$swal(error.data.message);
      }
    },
    ...mapActions(alertStore, ['miniSwal']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
