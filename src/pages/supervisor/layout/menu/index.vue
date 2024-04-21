<template>
  <el-menu-item index="">

  </el-menu-item>
</template>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<script setup lang="ts">
defineProps(['routeList'])
</script>

<style scoped lang="scss">
li {
  color: white;
}
</style>
