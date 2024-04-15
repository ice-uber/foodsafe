<template>
  <div class="container">
    <div class="welcom">
      <el-avatar :size="100" :src="userStore.avatar" />
      <div style="  margin-left: 50px;">
        <p class="title">欢迎使用校园食材一站式管理平台</p>
        <p class="" style="color:gray;margin-top:20px">学膳通</p>
      </div>

    </div>
    <img class="img" src="@/assets/imgaes/work.png" />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import { useUserStore } from '@/stores/modules/user.ts'
const userStore = useUserStore()

</script>

<style lang="scss" scoped>
.container {
  background-color: white;
}

.img {
  width: 450px;
  margin: 0 430px;
}

.welcom {
  display: flex;
  margin-top: 50px;
  margin-left: 60px;
  box-sizing: border-box;
  font-size: 30px;
}

.title {
  font-style: oblique;
}

p {
  margin: 0;
}
</style>