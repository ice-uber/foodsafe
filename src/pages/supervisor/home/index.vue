<template>
  <div>
    <el-card>
      <div class="box">
        <el-avatar :src="userStore.avatar" :size="120"></el-avatar>
        <div class="bottom">
          <h2 class="title">{{ getTime() + '好' + userStore.username }}</h2>
          <p class="logo-title">{{ logo.title }}</p>
        </div>
      </div>
    </el-card>
    <div class="bottoms">
      <!-- <svg-icon name="welcome" width="600px" height="300px"></svg-icon> -->
      <svg aria-hidden="true" class="svg-icon" style="width: 600px;height: 300px;">
        <use xlink:href="#icon-welcome" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { getTime } from '@/utils/time'
import { logo } from '@/settings'

const userStore = useUserStore()
</script>

<style scoped>
.logo-title {
  font-size: 16px;
  font-style: italic;
  color: grey;
}

.title {
  font-size: 20px;
  font-weight: bolder;
}

.box {
  height: 15vh;
  display: flex;
}

.bottom {
  height: 100%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.bottoms {
  margin-top: 15vh;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
