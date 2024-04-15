<template>
  <div class="container">
    <div class="header">
      <p style="font-size: 34px;font-weight: bolder;">支付结果</p>
      <p style="font-size: 20px;">Checkout Result</p>
    </div>
    <div class="content">
      <div class="title">
        <el-icon style="font-size: 100px;color: rgb(17, 151, 68);">
          <SuccessFilled />
        </el-icon>
        <div style="margin-left: 20px;">
          <p style="font-size: 50px;color: rgb(17, 151, 68);">支付成功</p>
          <p style="font-size: 25px; margin-top: 20px;">订单号: {{ route.query.orderNo }}</p>
        </div>
      </div>
      <div class="break">
        <p>{{ time }}秒后将自动调换至首页</p>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const time = ref(5)

onMounted(() => {
  let id = setInterval(() => {
    time.value = time.value - 1
    if (time.value == 0) {
      clearInterval(id)
      router.push("/purchaser/shopping")
    }
  }, 1000)
})

</script>

<style scoped>
.break {
  margin-top: 30px;
  font-size: 20px;
}

.title {
  display: flex;
  align-items: center;
}

p {
  margin: 0;
}

.container .header {
  width: 100%;
  height: 100px;
  background-color: white;
  margin-bottom: 30px;
  border-top: 5px solid rgb(17, 151, 68);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(17, 151, 68);
  cursor: pointer;
}

.content {
  width: 100%;
  background-color: white;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.container {
  display: flex;
  flex-direction: column;
  padding: 40px 100px;
  box-sizing: border-box;
}
</style>