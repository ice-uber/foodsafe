<template>
  <div class="container">
    <div class="header">
      <p style="font-size: 34px;font-weight: bolder;">结账单</p>
      <p style="font-size: 20px;">Check Out</p>
    </div>
    <div class="order">
      <p class="detail">订单详情</p>
      <el-table :data="shoppingCartStore.goodsList" style="width: 100%" :stripe="true" class="table">
        <el-table-column type="index" align="center" label="序号" width="180" />
        <el-table-column align="center" label="图片" width="180">
          <template #default="scope">
            <el-image style="width: 150px; height: 150px" :src="scope.row.goodsimg" fit="cover">
              <template #error>
                <div class="image-slot">
                  <el-tag size="large" type="success" style="font-size:16px;">商家未上传图片</el-tag>
                </div>
              </template>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="goodsname" align="center" label="商品名称" width="180" />

        <el-table-column align="center" label="配送商" width="180">
          <template #default="scope">
            <el-tag type="success" style="font-size: 18px;">{{ userStore.distributionCompanyName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="价格" width="180">
          <template #default="scope">
            <p>￥{{ scope.row.price }} / {{ scope.row.goodsunit }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="number" label="数量" width="180" />
        <el-table-column align="center" label="合计" width="180">
          <template #default="scope">
            <p style="font-size: 24px;color: rgb(17, 151, 68);">￥{{ (scope.row.price * scope.row.number).toFixed(2) }}</p>
          </template>
        </el-table-column>
      </el-table>
      <div class="total">
        <div>
          <p>小计</p>
          <p>￥{{ banlance }}</p>
        </div>
        <div>
          <p>运费</p>
          <p>￥0.00</p>
        </div>
        <div style="font-size: 24px;font-weight: bolder; color: rgb(17, 151, 68);">
          <p>合计</p>
          <p>￥{{ banlance }}</p>
        </div>
      </div>
    </div>
    <div class="orderForm">
      <p class="title">订单信息</p>
      <hr style="margin-top: 20px;width: 90%;">
      <el-form :model="orderForm" class="form" label-width="100px">
        <el-form-item label="收货地址">
          <el-select v-model="orderForm.addressId" placeholder="请选择收货地址" @change="onAddressChange" clearable>
            <el-option :label="item.address" :value="item.addressid" v-for="item in addressList" :key="item.addressid" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-tag type="success" v-if="addressDetail.name"> {{ addressDetail.name }}</el-tag>
        </el-form-item>
        <el-form-item>
          <el-tag type="success" v-if="addressDetail.phone"> {{ addressDetail.phone }}</el-tag>
        </el-form-item>
        <el-form-item>
          <el-tag type="success" v-if="addressDetail.address"> {{ addressDetail.address }}</el-tag>
        </el-form-item>
        <el-form-item label="送货日期">
          <el-date-picker v-model="orderForm.date" type="date" placeholder="送货日期" clearable
            :value-format="'YYYY-MM-DD'" />
        </el-form-item>
        <el-form-item label="交货时间段">
          <el-select v-model="orderForm.timeRange" placeholder="请选择时间段" clearable>
            <el-option label="4:00-6:00" value="4:00-6:00" />
            <el-option label="6:00-8:00" value="6:00-8:00" />
            <el-option label="8:00-10:00" value="8:00-10:00" />
            <el-option label="10:00-12:00" value="10:00-12:00" />
            <el-option label="12:00-14:00" value="12:00-14:00" />
            <el-option label="14:00-16:00" value="14:00-16:00" />
            <el-option label="16:00-18:00" value="16:00-18:00" />
          </el-select>
        </el-form-item>
        <el-form-item label="留言">
          <el-input type="textarea" v-model="orderForm.message" placeholder="说点什么..." clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="background-color: rgb(17, 151, 68);">申请送货</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue';

import { useUserStore } from '@/stores/modules/user.ts'
import { useShoppingCartStore } from '@/stores/modules/shoppingCart.ts'
import { reqCheckout } from '@/api/purchaser/order/index.ts'
import { reqAddressList, reqAddressInfo } from '@/api/purchaser/address/index.ts'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

const router = useRouter()

const orderForm = ref({
  timeRange: '',
  message: '',
  date: '',
  addressId: ''
})


const shoppingCartStore = useShoppingCartStore()
const userStore = useUserStore()

const banlance = ref(0)

const addressDetail = ref({})

// 当地址发生变化时
const onAddressChange = async (value) => {
  const res = await reqAddressInfo(value)
  if (res.data) {
    addressDetail.value = res.data
  }
}


// 点击申请送货
const onSubmit = async () => {
  const obj = {
    distributionId: userStore.distributionId,
    message: orderForm.value.message,
    distributiondate: orderForm.value.date,
    addressId: orderForm.value.addressId,
    timerange: orderForm.value.timeRange,
    goodsList: shoppingCartStore.goodsList
  }
  const res = await reqCheckout(obj)
  tips("订单提交成功", "订单提交失败", res.code)
  if (res.code === 200) {
    const orderNo = res.data
    router.push({
      path: "/purchaser/checkoutSuccess",
      query: {
        orderNo
      }
    }
    )
    shoppingCartStore.goodsList.length = 0
    shoppingCartStore.goodsArr.forEach((item) => {
      item.number = 0
    })
  }
}

onBeforeMount(() => {
  const list = shoppingCartStore.goodsList
  let count = 0;
  list.forEach(item => {
    count += item.number * item.price
  })
  banlance.value = count.toFixed(2)

  getAddressList()
})

const addressList = ref([])

// 获取用户地址
const getAddressList = async () => {
  const res = await reqAddressList()

  if (res.data) {
    addressList.value = res.data
  } else {
    {
      addressList.value = []
    }
  }
}

// 提示函数
const tips = (successMessage, errorMessage, code) => {
  if (code === 200) {
    ElMessage({
      type: 'success',
      message: successMessage
    })
  } else {
    ElMessage({
      type: 'error',
      message: errorMessage
    })
  }
}

</script>

<style scoped>
.image-slot {
  height: 150px;
  width: 150px;
  background-color: rgb(245, 247, 250);
  display: flex;
  justify-content: center;
  align-items: center;

}

.table {
  font-size: 18px;
}

.order .detail {
  width: 100%;
  height: 50px;
  border-left: 5px solid rgb(17, 151, 68);
  font-size: 30px;
  font-weight: bolder;
  padding: 20px;
}

.form {
  margin: 10px 10px;
  margin-top: 50px;
}

.orderForm .title {
  height: 50px;
  border-left: 5px solid rgb(17, 151, 68);
  font-size: 30px;
  font-weight: bolder;
  padding: 20px;
}

.orderForm {
  margin-top: 30px;
  width: 100%;
  /* height: 700px; */
  background-color: white;
  padding: 20px 30px;
  box-sizing: border-box;
}

.total div p {
  margin: 20px 10px;

}

.total div {
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  border-bottom: 1px solid rgb(184, 183, 183);
}

.total div:last-child {
  border-bottom: 0;
}

.total {
  margin-top: 40px;
  width: 50%;
  height: 300px;
  border-top: 3px solid rgb(17, 151, 68);
  display: flex;
  flex-direction: column;
}

.container .order {
  padding: 20px 40px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0;
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

.container {
  display: flex;
  flex-direction: column;
  padding: 40px 100px;
  box-sizing: border-box;
}
</style>