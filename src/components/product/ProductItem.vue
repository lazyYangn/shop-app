<template>
  <div class="product-edit">
    <div class="pic" :style="imgStyle(product.imgpath)"></div>
    <div class="wrapper-right">
      <div style="font-size: 14px; color: rgb(0 0 0 /0.5); font-weight: bold">
        {{ product.name }}
      </div>
      <div style="font-size: 14px; color: #fa6400">{{ showPrice }}</div>
      <div class="btn-group">
      <a-popconfirm
        v-if="product.countbuy <= 1"
        title="是否从购物车移除该商品?"
        ok-text="移除"
        cancel-text="取消"
        @confirm="confirm"
      >
      <div class="btn_g">-</div>
      </a-popconfirm>
      <div class="btn_g" v-else @click="decreaseCart(index)">-</div>
        <div style="margin: 1px 10px">{{ product.countbuy }}</div>
        <div class="btn_g" @click="increaseCart(index)">+</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Http, HttpGql, ImgUrl } from "@/kits/Http";
export default {
  name: "ProductItem",
  data() {
    return {};
  },
  props: {
    index: Number,
    product: Object,
  },
  computed: {
    showPrice() {
      return "￥" + this.product.price * this.product.countbuy;
    },
    imgStyle() {
      return (url) => {
        return {
          backgroundImage: `url(${url})`,
          backgroundSize: "75px 75px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center  center",
        };
      };
    },
  },
  methods: {
    increaseCart(index) {
      this.$store.dispatch("increaseCart",this.index)
    },
    decreaseCart(index) {
      this.$store.dispatch("decreaseCart",this.index)
    },
    confirm(e) {
    this.$message.success('Click on Yes');
    this.$store.dispatch('decreaseCart',this.index)
    },
  },
};
</script>

<style scoped>
.product-edit {
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  padding: 12px 24px;
  margin: 15px 0;
}
.pic {
  background-color: #e5e5e5;
  height: 75px;
  width: 75px;
  border-radius: 10px;
  flex: 1;
  box-shadow: 0px 1px 6px rgb(40 40 40 / 0.2);
}
.wrapper-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
  margin-left: 24px;
}
.btn-group {
  display: flex;
}
.btn_g {
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 2px rgb(40 40 40 /0.5);
}
</style>
