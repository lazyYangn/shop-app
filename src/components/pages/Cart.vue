<template>
  <div>
    <TopBar>
      <div slot="left" class="iconfont icon-back arrow" @click="goBack"></div>
      <div slot="middle" style="font-weight: bold; font-size: 16px">购物车</div>
    </TopBar>
    <MyContent
      style="padding-left: unset; padding-right: unset; padding: unset"
    >
      <ProductItem
        v-for="(item, index) in $store.state.cartDate"
        :key="item.id"
        :index="index"
        :product="item"
      ></ProductItem>
    </MyContent>
    <FooterBar>
      <div slot="left" style="flex: 1">
        <div style="color: rgb(0 0 0 /0.5); font-size: 12px; font-weight: bold">
          总价:
        </div>
        <div style="color: #fa6400; font-size: 16px; font-weight: bold">
          {{ $store.getters.priceSum }}
        </div>
      </div>
      <FooterBarItem
        slot="right"
        name="购买"
        class="btn btn-right"
        @funcHandler="order"
      ></FooterBarItem>
    </FooterBar>
  </div>
</template>

<script>
import TopBar from "@/components/topbar/TopBar";
import FooterBar from "@/components/footer/FooterBar";
import FooterBarItem from "@/components/footer/FooterBarItem";
import MyContent from "@/components/content/MyContent";
import ProductItem from "@/components/product/ProductItem";
import { Http, HttpGql, ImgUrl } from "@/kits/Http";
export default {
  name: "Cart",
  data() {
    return {};
  },
  components: {
    TopBar,
    FooterBar,
    FooterBarItem,
    MyContent,
    ProductItem,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
   async order(){
      let res = await this.$store.dispatch("order")
      console.log(res)
      if(res.code === 1){
          this.$message.success(res.msg)
      }else{
          this.$message.error(res.msg)
      }
            
    }
  },
};
</script>

<style scoped>
.footer {
  background-color: #fff;
  box-shadow: 0px 0px 8px #e3e3e3;
}
.arrow {
  font-size: 24px;
}
.btn {
  flex: 1;
  margin: 0 10px;
  padding: 0 8px;
  border-radius: 8px;
}
.btn-right {
  background-color: #2f69f8;
  color: #fff;
}
</style>
