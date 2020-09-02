<template>
  <div class="tab-bar tab-bar-extend">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
}
</script>

<style scoped>
.tab-bar {
  height: 58px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 0px 8px #e3e3e3;
}
.tab-bar-extend {
  display: flex;
  align-items: center;
}
</style>
