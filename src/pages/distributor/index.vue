<template>
  <div class="container">
    <Header></Header>
    <div class="content">
      <el-menu :router="true" default-active="0" class="el-menu-demo menu" mode="horizontal">
        <el-menu-item index="/distributor/index">首页</el-menu-item>
        <el-menu-item index="/distributor/product">商品维护</el-menu-item>
        <!-- <el-menu-item index="/distributor/account">账号管理</el-menu-item> -->
        <el-menu-item index="/distributor/customer">我的客户</el-menu-item>
        <el-menu-item index="/distributor/order">订单处理</el-menu-item>
        <el-menu-item index="/distributor/supplier">供货商管理</el-menu-item>
        <el-menu-item index="/distributor/statement_account">对账单</el-menu-item>
        <!-- <el-menu-item index="/distributor/detection">检测中心</el-menu-item> -->
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
    <footer class="footer">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>合作招商</li>
        <li>商家帮助</li>
        <li>营销中心</li>
        <li>友情链接</li>
        <li>销售联盟</li>
        <li>风险监测</li>
        <li>质量公告</li>
        <li>隐私政策</li>
      </ul>
      <p>Copyright © 2024 没有版权 ^.^</p>

    </footer>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, watch, ref, onMounted } from "vue"
import Header from '@/pages/distributor/index/header/index.vue'
import { useRouter, useRoute } from 'vue-router'
import { log } from "console"
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
import { useUserStore } from '@/stores/modules/user.ts'

defineComponent({
  Header
})
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

onMounted(() => {
  ElNotification({
    type: 'success',
    message: '登录成功！',
    title: `Hi,${getTime()}好`,
    offset: 40
  })
  router.push('/distributor/index')
})


</script>

<style scoped>
.logo {
  width: 100px;
  height: 100px;
}

.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 60px;
  background-color: rgb(35, 39, 46);
  padding: 0 10%;
  color: white;
  display: flex;
  justify-content: center;
  align-content: center;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  z-index: 1;
}

.footer ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer ul {
  display: flex;
  font-size: 16px;
}

.footer ul li {
  margin: 0 10px;
  cursor: pointer;
}

.footer ul li:hover {
  color: red;
}

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