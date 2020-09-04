<template>
  <div class="my-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MyContent',
  data() {
    return {}
  },
}
</script>

<style scoped>
.my-content {
  padding: 24px;
  height: 100vh;
}
</style>
