<template>
  <div class="tabbar_container">
    <!--  头部左侧  -->
    <div class="tabbar_left">
      <el-icon :size="20" class="icon" @click="layoutSettings.setFold(!layoutSettings.fold)">
        <Expand v-if="!layoutSettings.fold"></Expand>
        <Fold v-if="layoutSettings.fold"></Fold>
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in route.matched" :key="item.path" v-show="item.meta.title">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--  头部右侧  -->
    <div class="tabbar_right">
      <el-button class="el_icon" :type="'primary'" icon="Refresh" :circle="true" color="white"
        @click="refresh"></el-button>
      <el-button :type="'primary'" icon="FullScreen" :circle="true" color="white" class="el_icon"
        @click="fullScreen"></el-button>
      <el-button :type="'primary'" icon="Setting" :circle="true" color="white" class="el_icon"></el-button>
      <el-avatar :src="userStore.avatar" class="avatar" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLayoutSettings } from '@/stores/modules/LayoutrSettings'
import { useUserStore } from '@/stores/modules/user.ts'
import { useRoute, useRouter } from 'vue-router'
import screenfull from 'screenfull'
const userStore = useUserStore()
const layoutSettings = useLayoutSettings()
const route = useRoute()
const router = useRouter()

// 刷新
function refresh() {
  layoutSettings.refresh = !layoutSettings.refresh
}

// 全屏
function fullScreen() {
  if (screenfull.isEnabled) {
    screenfull.request()
  }
  if (screenfull.isFullscreen) {
    screenfull.exit()
  }
}

// 退出登录
async function logout() {
  // 清空用户数据
  await userStore.logout()
  router.push('/login')
}
</script>

<style scoped lang="scss">
.tabbar_container {
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  justify-content: space-between;
  background-color: white;

  .tabbar_left {
    display: flex;
    align-items: center;
    background-color: white;

    .icon {
      margin-left: 20px;
      margin-right: 10px;
    }
  }

  .tabbar_right {
    padding-right: 10px;
    display: flex;
    align-items: center;
    height: 100%;

    .avatar {
      margin-left: 20px;
      margin-right: 10px;
    }

    .el_icon {
      border: 1px solid grey;
    }
  }
}
</style>
