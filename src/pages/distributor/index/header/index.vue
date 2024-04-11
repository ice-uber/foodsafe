<template>
  <header class="header">
    <p>您好{{ userStore.username }},欢迎来到校园食安平台！</p>
    <div class="userInfo">
      <el-avatar :src="userStore.avatar" />
      <el-dropdown>
        <span>
          {{ userStore.username }}
          <el-icon>
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>用户中心</el-dropdown-item>
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item>登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import { useUserStore } from '@/stores/modules/user.ts'
import { ArrowDown } from '@element-plus/icons-vue'

const userStore = useUserStore()
defineComponent({
  ArrowDown
})


</script>

<style lang="scss" scoped>
.header {
  font-size: 16px;
  width: 100%;
  height: 50px;
  background-color: rgb(255, 255, 255);
  padding: 0 10%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
}

.userInfo {
  width: 13%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>