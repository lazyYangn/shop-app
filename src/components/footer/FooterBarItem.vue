<template>
  <a-button size="large" @click="goPath">{{ name }}</a-button>
</template>

<script>
export default {
  name: 'FooterBarItem',
  data() {
    return {}
  },
  props: {
    name,
  },
  methods: {
    goPath() {
      this.$emit('funcHandler')
    },
  },
}
</script>

<style scoped></style>
