<template>
  <div class="root">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "HScroll",
  data() {
    return {};
  },
};
</script>

<style scoped>
.root {
  display: flex;
  overflow: hidden;
  margin-top: 18px;
  overflow-x: auto;
}
::-webkit-scrollbar {
  display: none;
}
</style>
