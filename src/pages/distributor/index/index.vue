<template>
  <div class="container">
    <Header></Header>
    <div class="content">
      <el-menu :router="true" :default-active="activeIndex2" class="el-menu-demo menu" mode="horizontal">
        <el-menu-item index="/distributor/product">商品维护</el-menu-item>
        <el-menu-item index="/distributor/account">账号管理</el-menu-item>
        <el-menu-item index="/distributor/customer">我的客户</el-menu-item>
        <el-menu-item index="/distributor/order">订单处理</el-menu-item>
        <el-menu-item index="/distributor/supplier">供货商管理</el-menu-item>
        <el-menu-item index="/distributor/statement_account">对账单</el-menu-item>
        <el-menu-item index="/distributor/detection">检测中心</el-menu-item>
      </el-menu>

      <div class="main">
        <el-card class="card">
          <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item v-for="item in route.matched" :key="item.path" v-show="item.meta.title" :to="item.path">
              {{ item.meta.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>




          <router-view v-slot="{ Component }">
            <transition mode="out-in" enter-active-class="animate__animated animate__fadeIn">
              <component :is="Component" />
            </transition>
          </router-view>

          <!-- 
          <router-view></router-view> -->









        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, watch, ref } from "vue"
import Header from '@/pages/distributor/index/header/index.vue'
import { useRouter, useRoute } from 'vue-router'
import { log } from "console"

defineComponent({
  Header
})
const router = useRouter()
const route = useRoute()

console.log(router.currentRoute.value.fullPath)

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: rgb(239, 238, 241);
}

.menu {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  border-radius: 10px;
}

.content {
  padding: 0 10%;
  height: 80%;
}

.main {
  height: 100%;
}

.card {
  width: 100%;
  height: 90%;
}

.breadcrumb {
  margin: 0 10px 10px 0;
}
</style>