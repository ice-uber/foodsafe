<template>
  <p>监测中心</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "",
  props: {
  },
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
  },
  beforeCreate() {
    // console.log("组件即将创建前");
  },
  created() {
    // console.log("组件创建完成");
  },
  beforeMount() {
    // console.log("组件即将挂载前");
  },
  mounted() {
    // console.log("组件挂载完成");
  },
  beforeUpdate() {
    // console.log("组件即将更新前");
  },
  updated() {
    // console.log("组件更新完成");
  },
  activated() {
    // console.log("被缓存的组件激活时调用");
  },
  deactivated() {
    // console.log("被缓存的组件停用时调用");
  },
  beforeUnmount() {
    // console.log("组件即将被卸载前调用");
  },
  unmounted() {
    // console.log("组件被卸载后调用");
  },
  errorCaptured() {
    // console.log("捕获到来自子组件的异常时调用");
  },
  renderTracked() {
    // console.log("虚拟DOM重新渲染时调用");
  },
  renderTriggered() {
    // console.log("虚拟DOM被触发渲染时调用");
  },
})
</script>

<style lang="scss" scoped></style>