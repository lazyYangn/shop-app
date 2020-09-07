<template>
  <div>
    <TopBar @searchCon="searchContentHandle">
      <div slot="left" class="iconfont icon-back1 arrow" @click="goBack"></div>
      <div slot="right" class="iconfont icon-search search" @click="search"></div>
    </TopBar>

    <MyContent>
      <div class="historySearch">
        <div style="display:flex;justify-content:space-between">
          <div style="color:rgb(0 0 0 /.5);font-size:14px;font-weight:bold">最近搜索</div>
          <div style="color:rgb(0 0 0 /.5);font-size:16px;font-weight:bold">
            <a-icon type="delete" @click="clearLacalStorage" />
          </div>
        </div>
        <div class="history-search-content">
          <div
            class="history-search-content-item"
            v-for="(item,index) in historySearch"
            :key="item + index"
          >{{ item }}</div>
        </div>
      </div>
    </MyContent>
  </div>
</template>

<script>
import TopBar from "@/components/topbar/TopBar";
import MyContent from "@/components/content/MyContent";
import { getArray, setArray, clearArray } from "@/kits/LocalStorage.js";
export default {
  name: "Search",
  data() {
    return {
      searchContent: "",
      historySearch: getArray("historySearch"), //本项目的获取localstorage 是线性获取 不是异步获取
    };
  },
  components: {
    TopBar,
    MyContent,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    search() {
      if (this.searchContent !== "") {
        setArray("historySearch", this.searchContent);
        this.$router.push({
          name: "searchresult",
          params: { content: this.searchContent },
        }); //传参
      } else {
        this.$message.info("请先输入要搜索的东西");
      }
    },
    searchContentHandle(content) {
      this.searchContent = content;
    },
    clearLacalStorage() {
      clearArray("historySearch");
      this.historySearch = [];
    },
  },
};
</script>

<style scoped>
.arrow .search {
  font-size: 20px;
}
.historySearch {
  padding: 24px;
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
</style>
