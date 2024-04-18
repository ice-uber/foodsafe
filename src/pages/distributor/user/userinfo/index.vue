<template>
  <div class="container">
    <div class="header">
      <p>账号: {{ userStore.username }}</p>
      <p>单位名称: {{ userStore.companyName }}</p>
    </div>
    <hr style="border: 1px solid rgb(234, 234, 234)">
    <div class="content">
      <div>
        <el-tag style="font-size:30px;height:40px;" size="large" type="danger">{{ orderStatus.unAccept }}</el-tag>
        <p>待受理</p>
      </div>
      <div>
        <el-tag style="font-size:30px;height:40px" size="large" type="warning">{{ orderStatus.unSend }}</el-tag>
        <p>待发货</p>
      </div>
      <div>
        <el-tag style="font-size:30px;height:40px;" size="large">{{ orderStatus.send }}</el-tag>
        <p>已发货</p>
      </div>
      <div>
        <el-tag style="font-size:30px;height:40px;" size="large">{{ orderStatus.receive }}</el-tag>
        <p>已签收</p>
      </div>
      <div>
        <el-tag style="font-size:30px;height:40px;" size="large" type="success">{{ orderStatus.finish }}</el-tag>
        <p>已完成</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onBeforeMount, ref } from "vue";
import { useUserStore } from '@/stores/modules/user.ts'
import { reqOrderCount } from '@/api/distributor/user/userInfo/index.ts'

const userStore = useUserStore()

const orderStatus = ref({
  unAccept: 0,
  unSend: 0,
  send: 0,
  receive: 0,
  finish: 0
})

onBeforeMount(async () => {
  const res = await reqOrderCount()
  orderStatus.value.unAccept = res.data.unAccept
  orderStatus.value.unSend = res.data.unSend
  orderStatus.value.send = res.data.send
  orderStatus.value.receive = res.data.receive
  orderStatus.value.finish = res.data.finish

})

</script>

<style lang="scss" scoped>
.header {
  margin: 0px 20px;
  margin-top: 50px;
  font-size: 16px;
}

.container {
  background-color: white;
}

.content {
  display: flex;
  font-size: 30px;
}

.content>div {
  margin: 150px 0;
  margin-left: 135px;
  display: flex;
  flex-direction: column;
}
</style>