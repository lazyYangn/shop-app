<template>
  <div class="topbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="middle">
      <slot name="middle">
        <a-input ref="SearchInput" placeholder="请输入查询内容" size="large" @focus="focusFunc" v-model="searchContent">
          <a-icon slot="prefix" type="edit" />
        </a-input>
      </slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      searchContent: '',
      timer: null,
    }
  },
  props: {},

  components: {},
  methods: {
    focusFunc() {
      this.$emit('focusFunc', '/search')
    },
  },
  watch: {
    searchContent(newVal) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        //输入第一个字符之后在500之内输入第二个字符会重新进入方法然后清除timer
        this.$emit('searchCon', newVal)
      }, 500)
    },
  },
}
</script>

<style>
.topbar {
  height: 60px;
  background-color: #fff;
  box-shadow: 0px 1px 2px rgba(40, 40, 40, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;
}
.middle {
  width: 80%;
}
.right .iconfont {
  font-size: 24px;
}
.ant-input {
  background-color: rgb(172 172 172 / 0.1) !important;
  border: none !important;
  border-radius: 8px !important;
}
</style>
