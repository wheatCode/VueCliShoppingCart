<template>
  <div>
    <div
      class="modal fade"
      id="productCard"
      tabindex="-1"
      role="dialog"
      @keyup.enter="submitProduct((id = Aproduct.id || ''))"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="productTop">
              <span v-if="!Aproduct.id">新增產品</span>
              <span v-else>修改產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.has('圖片網址') }"
                    id="image"
                    name="圖片網址"
                    placeholder="請輸入圖片連結"
                    v-validate="'required'"
                    v-model="Aproduct.image"
                  />
                  <span v-if="errors.has('圖片網址')" class="text-danger">
                    {{ errors.first('圖片網址') }}</span
                  >
                </div>
                <div class="form-group">
                  <label for="customFile"
                    ><span> 或 上傳圖片</span>
                    <font-awesome-icon
                      v-if="canUpload"
                      icon="spinner"
                      class="fa-spin"
                    />
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="image"
                    @change="addImage"
                  />
                </div>
                <img :src="Aproduct.image" class="img-fluid" alt="" />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.has('標題') }"
                    id="title"
                    name="標題"
                    placeholder="請輸入標題"
                    v-validate="'required'"
                    v-model="Aproduct.title"
                  />
                  <span v-if="errors.has('標題')" class="text-danger">
                    {{ errors.first('標題') }}</span
                  >
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors.has('分類') }"
                      id="category"
                      name="分類"
                      placeholder="請輸入分類"
                      v-validate="'required'"
                      v-model="Aproduct.category"
                    />
                    <span v-if="errors.has('分類')" class="text-danger">{{
                      errors.first('分類')
                    }}</span>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      :class="{ 'is-invalid': errors.has('單位') }"
                      id="unit"
                      name="單位"
                      placeholder="請輸入單位"
                      v-model="Aproduct.unit"
                      v-validate="'required'"
                    />
                    <span v-if="errors.has('單位')" class="text-danger">{{
                      errors.first('單位')
                    }}</span>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      :class="{ 'is-invalid': errors.has('原價') }"
                      id="origin_price"
                      name="原價"
                      placeholder="請輸入原價"
                      v-model="Aproduct.origin_price"
                      v-validate="'required|min_value:0'"
                    />
                    <span v-if="errors.has('原價')" class="text-danger">{{
                      errors.first('原價')
                    }}</span>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      oninput="value = value.replace(/[^\d]/g, '')"
                      :class="{
                        'is-invalid': Aproduct.origin_price
                          ? errors.has('售價')
                          : false
                      }"
                      id="price"
                      name="售價"
                      placeholder="請輸入售價"
                      v-model="Aproduct.price"
                      v-validate="
                        `required|min_value:0|max_value:${
                          Aproduct.origin_price ? Aproduct.origin_price : 0
                        }`
                      "
                      :disabled="!Aproduct.origin_price ? true : false"
                      :required="Aproduct.origin_price ? true : false"
                    />
                    <span
                      v-if="Aproduct.origin_price ? errors.has('售價') : false"
                      class="text-danger"
                      >{{ errors.first('售價') }}</span
                    >
                    <span v-if="!Aproduct.origin_price" class="text-primary">
                      請先輸入原價
                    </span>
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.has('產品描述') }"
                    id="description"
                    name="產品描述"
                    placeholder="請輸入產品描述"
                    v-model="Aproduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.has('說明內容') }"
                    id="content"
                    name="說明內容"
                    placeholder="請輸入產品說明內容"
                    v-model="Aproduct.content"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer" style="position: relative">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="submitProduct((id = Aproduct.id || ''))"
            >
              <span v-if="isSubmit === false">確認</span>
              <font-awesome-icon
                v-else-if="isSubmit === true"
                icon="spinner"
                class="fa-spin"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  props: {
    product: {
      type: Object,
      defalut: {}
    }
  },
  components: {},
  data() {
    return {
      canUpload: false,
      isLoading: false,
      isSubmit: false,
      Aproduct: {}
    };
  },
  methods: {
    toggleCard(canOpenCard) {
      canOpenCard
        ? $('#productCard').modal('show')
        : $('#productCard').modal('hide');
    },
    async submitProduct(id) {
      this.isSubmit = true;
      const vm = this;
      await this.$validator.validate().then(async result => {
        if (result) {
          const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/product`;
          if (id) {
            await vm.editProduct(api, id);
          } else {
            await vm.createProduct(api);
          }
          new Promise(resolve =>
            vm.$emit('getProducts', this.$route.query.page, resolve)
          );
          this.toggleCard(false);
        } else {
          document.getElementById('productTop').scrollIntoView();
        }
      });
      this.isSubmit = false;
    },
    async createProduct(api) {
      await this.$http.post(api, { data: this.Aproduct });
    },
    async editProduct(api, id) {
      await this.$http.put(api + `/${id}`, {
        data: this.Aproduct
      });
    },
    async addImage() {
      this.canUpload = true;
      const image = this.$refs.image.files[0];
      const imageFormData = new FormData();
      imageFormData.append('image', image);
      const api = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_API_PATH}/admin/upload`;
      const data = await this.axios.post(api, imageFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      this.Aproduct.image = data.data.imageUrl;
      this.canUpload = false;
    }
  },
  watch: {
    product() {
      this.Aproduct = { ...this.product };
      this.errors.clear();
      this.toggleCard(true);
    }
  }
};
</script>
