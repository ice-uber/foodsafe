<template>
  <div class="layout_container">
    <!--  左侧菜单  -->
    <div class="layout_navigation" :class="{ fold: layoutSettings.fold }">
      <Logo></Logo>
      <el-scrollbar class="menu">
        <el-menu :collapse="layoutSettings.fold" background-color="#001529" text-color="white" :router="true"
          :default-active="$route.path">
          <el-menu-item index="/supervisor/home">
            <el-icon>
              <HomeFilled />
            </el-icon>
            <template #title>
              首页
            </template>
          </el-menu-item>
          <el-menu-item index="/supervisor/foodSource">
            <el-icon>
              <Tickets />
            </el-icon>
            <template #title>
              食材溯源
            </template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--  头部导航栏  -->
    <div class="layout_header" :class="{ fold: layoutSettings.fold }">
      <Tabbar></Tabbar>
    </div>
    <!--  中间内容区  -->
    <div class="layout_main" :class="{ fold: layoutSettings.fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/pages/supervisor/layout/menu/index.vue'

import Main from '@/pages/supervisor/layout/main/index.vue'
import Tabbar from '@/pages/supervisor/layout/tabbar/index.vue'
import Logo from '@/components/logo/index.vue'
import { useLayoutSettings } from '@/stores/modules/LayoutrSettings'
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'

const router = useRouter()
onBeforeMount(() => {
  router.push("/supervisor/home")
})
const layoutSettings = useLayoutSettings()
</script>

<style scoped lang="scss">
$base-menu-width: 260px;
$base-menu-background: #001529;
$base-menu-min-width: 70px;
$base-tabbar-height: 50px;
$base-menu-logo-height: 50px;
$base-logo-title-fontSize: 20px;

.layout_container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;

  .layout_navigation {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    overflow: hidden;
    transition-duration: 0.3s;

    .menu {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      color: white;

      .el-menu {
        border: 0;
      }
    }

    &.fold {
      width: $base-menu-width;
    }
  }

  .layout_header {
    position: fixed;
    height: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    top: 0;
    left: $base-menu-width;
    border-bottom: 1px solid grey;
    transition: 0.3s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }

  .layout_main {
    padding: 20px;
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    top: $base-tabbar-height;
    left: $base-menu-width;
    background-color: white;
    overflow: auto;
    transition-duration: 0.3s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }
}
</style>
