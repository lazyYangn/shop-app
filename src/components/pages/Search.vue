<template>
  <div>
    <TopBar @searchCon="searchContentHandle">
      <div slot="left" class="iconfont icon-back1 arrow" @click="goBack"></div>
      <div
        slot="right"
        class="iconfont icon-search search"
        @click="search"
      ></div>
    </TopBar>

    <MyContent>
      <div class="historySearch">
        <div style="display: flex; justify-content: space-between">
          <div
            style="color: rgb(0 0 0 /0.5); font-size: 14px; font-weight: bold"
          >
            最近搜索
          </div>
          <div
            style="color: rgb(0 0 0 /0.5); font-size: 16px; font-weight: bold"
          >
            <a-icon type="delete" @click="clearLacalStorage" />
          </div>
        </div>
        <div class="history-search-content">
          <div
            @click="searchByHistory(item)"
            class="history-search-content-item"
            v-for="(item, index) in historySearch"
            :key="item + index"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div style="margin-top: 100px">
        <div class="visited-good-title">最近浏览的商品</div>
        <HScroll class="visited-good-card">
          <Product
            class="visited-good-item"
            v-for="(item, index) in goods"
            :key="item + index"
            :product="item"
          ></Product>
        </HScroll>
      </div>
      <div style="margin-top: 42px">
        <div class="visited-good-title">近期最流行的商品</div>
        <div v-for="item in goodpop" :key="item.id" class="pop-good">
          <ProductPop :product="item"></ProductPop>
        </div>
      </div>
    </MyContent>
  </div>
</template>

<script>
import TopBar from "@/components/topbar/TopBar";
import MyContent from "@/components/content/MyContent";
import Product from "@/components/product/Product";
import ProductPop from "@/components/product/ProductPop";
import {
  getArray,
  setArray,
  clearArray,
  getCachVal,
} from "@/kits/LocalStorage.js";
import SearchResultVue from "./SearchResult.vue";
import HScroll from "@/components/scroll/HScroll";
import { HttpGql, ImgUrl } from "@/kits/Http";

export default {
  name: "Search",
  data() {
    return {
      searchContent: "",
      historySearch: getArray("historySearch"), //本项目的获取localstorage 是线性获取 不是异步获取
      goods: [],
      goodpop: [],
    };
  },
  components: {
    TopBar,
    MyContent,
    Product,
    HScroll,
    ProductPop,
  },

  created() {
    if (getCachVal("token") && getCachVal("token").length > 0) {
      this.initData(true);
    } else {
      this.initData(false);
    }
  },
  methods: {
    goBack() {
      this.$router.replace({ path: "main/home" });
    },
    search() {
      if (this.searchContent !== "") {
        setArray("historySearch", this.searchContent);
        this.$store.commit("setSearchInput", this.searchContent);
        this.$router.push({
          name: "searchresult",
        }); //传参
      } else {
        this.$message.info("请先输入要搜索的东西");
      }
    },
    searchContentHandle(content) {
      this.searchContent = content;
    },
    searchByHistory(content) {
      this.$store.commit("setSearchInput", content);
      this.$router.push({
        name: "searchresult",
      });
    },
    clearLacalStorage() {
      clearArray("historySearch");
      this.historySearch = [];
    },
    async initData(isLogin) {
      let gql = isLogin
        ? {
            query: `
        {
           goodpop(count:5){
              name
              id
              price
              imgpath
              visitedcount
              gooddesc
              type{
                id
              }
            }
           userVisited(userid:"${getCachVal("userid")}",start:0,count:5){
              name
              price
              imgpath
              id
              type{
                id
              }
              visitedcount
            }
        }`,
          }
        : {
            query: `
          goodpop(count:5){
              name
              id
              price
              imgpath
              visitedcount
              gooddesc
              type{
                id
              }
            }
        `,
          };
      try {
        let res = await HttpGql(gql);
        this.goods = res.data.userVisited.map((item) => {
          item.imgpath = ImgUrl + item.imgpath;
          return item;
        });
        this.goodpop = res.data.goodpop.map((item, index) => {
          item.imgpath = ImgUrl + item.imgpath;
          item.iconClass = "icon-" + (index + 1) + "01";
          return item;
        });
      } catch (error) {
        return error;
      }
    },
  },
};
</script>

<style scoped>
.arrow .search {
  font-size: 20px;
}
.history-search-content {
  margin-top: 8px;
  font-size: 14px;
}
.history-search-content-item {
  background-color: #fff;
  padding: 2px 6px;
  box-shadow: 0px 1px 2px rgb(40, 40, 40 /0.2);
  margin-top: 5px;
  margin-right: 8px;
  float: left;
}
.visited-good-title {
  font-size: 14px;
  color: rgb(0 0 0 /0.5);
  font-weight: bold;
  margin-top: 38px;
}
.visited-good-item {
  flex-shrink: 0;
  margin: 0 12px;
}
.pop-good {
  margin-top: 20px;
}
</style>
