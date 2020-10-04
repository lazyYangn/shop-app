<template>
  <div>
    <div class="footer-bar">
      <slot name="left"> </slot>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
.footer-bar {
  position: fixed;
  bottom: 0px;
  right: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0px 0px 8px #e3e3e3;
  padding: 16px;
  height: 59px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
