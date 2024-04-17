<template>
  <div class="container">
    <Hearder title="我的订单" sencondTitle="My Orders"></Hearder>
    <div class="content">
      <div class="header">
        <el-steps class="step" :space="200" :active="setp" finish-status="success" @change="onStepChange">
          <el-step title="未受理" @click="setp = 0" icon="DocumentDelete">
            <template #title>
              <el-badge :value="orderCount.unAccept" class="item">
                <p>未受理</p>
              </el-badge>
            </template>
          </el-step>

          <el-step @click="setp = 1" title="待发货" icon="Box"> <template #title>
              <el-badge :value="orderCount.unSend" class="item">
                <p>待发货</p>
              </el-badge>
            </template></el-step>
          <el-step @click="setp = 2" title="待收货" icon="Van"> <template #title>
              <el-badge :value="orderCount.send" class="item">
                <p>待收货</p>
              </el-badge>
            </template></el-step>
          <el-step @click="setp = 3" title="已签收" icon="DocumentChecked"> <template #title>
              <el-badge :value="orderCount.receive" class="item">
                <p>已签收</p>
              </el-badge>
            </template></el-step>
          <el-step @click="setp = 4" title="已完成" icon="SuccessFilled"> <template #title>
              <el-badge :value="orderCount.finish" class="item">
                <p>已完成</p>
              </el-badge>
            </template></el-step>


          <el-step title="全部订单" @click="setp = 5" icon="Tickets">
            <template #title>
              <el-badge :value="orderCount.total" class="item">
                <p>全部订单</p>
              </el-badge>
            </template>
          </el-step>
        </el-steps>

        <TransitionGroup enter-active-class="animate__animated animate__fadeIn" leave-active-class="leave">
          <div v-if="orderArr.length === 0" class="empty">
            <svg aria-hidden="true" class="svg-icon">
              <use xlink:href="#icon-empty" />
            </svg>
            <p style="font-size: 30px; color: rgb(17, 151, 68);margin-top: 20px;">没有订单列表</p>


          </div>
          <div class="order" v-for="(item, index) in orderArr" :key="item.orderid">
            <div class="header">
              <p class="title">
              <div>
                订单详情 #{{ index + 1 }}
                <el-tag style="font-size: 20px;height: 30px;" v-if="item.status === '0'" type="danger">未受理</el-tag>
                <el-tag style="font-size: 20px;height: 30px;" v-if="item.status === '1'" type="success">待发货</el-tag>
                <el-tag style="font-size: 20px;height: 30px;" v-if="item.status === '2'" type="success">待收货</el-tag>
                <el-tag style="font-size: 20px;height: 30px;" v-if="item.status === '3'" type="success">已签收</el-tag>
                <el-tag style="font-size: 20px;height: 30px;" v-if="item.status === '4'" type="success">已完成</el-tag>
                <el-tag style="font-size: 20px;height: 30px;" v-if="item.status === '5'" type="success">拒绝签收</el-tag>
                <el-tag style="font-size: 20px;height: 30px;" v-if="item.status === '6'" type="success">拒绝受理</el-tag>
                <el-tag style="font-size: 20px;height: 30px;" v-if="item.status === '7'" type="success">已取消</el-tag>
              </div>
              <div>

                <el-popconfirm v-if="item.status === '0'" @confirm="handeCancel(item.orderid)" :title="`您确定取消该订单吗?`"
                  icon-color="#119744">
                  <template #reference>
                    <el-button type="danger">取消订单</el-button>
                  </template>
                </el-popconfirm>

                <el-popconfirm @confirm="handeDelete(item.orderid)" v-if="item.status === '4'" :title="`您确定删除该订单吗?`">
                  <template #reference>
                    <el-button type="danger">删除订单</el-button>
                  </template>
                </el-popconfirm>


                <el-button v-if="item.status === '2'" @click="handeReceive(item)" type="success">签收订单</el-button>


              </div>
              </p>

              <div>
                <div class="detail">
                  <div>
                    <p>订单编号</p>
                    <p>{{ item.orderno }}</p>
                  </div>
                  <div>
                    <p>订单项数量</p>
                    <p>{{ item.children.length }}</p>
                  </div>
                  <div>
                    <p>定购时间</p>
                    <p>{{ item.addtime }}</p>
                  </div>
                  <div>
                    <p>交货日期</p>
                    <p>{{ item.distributiondate }}</p>
                  </div>
                </div>
                <div class="detail">
                  <div>
                    <p>订单地址</p>
                    <p>{{ item.address }}</p>
                  </div>
                  <div>
                    <p>订购人</p>
                    <p>{{ item.addrName }}</p>
                  </div>
                  <div>
                    <p>电话号码</p>
                    <p>{{ item.addrPhone }}</p>
                  </div>
                  <div>
                    <p>交货时间段</p>
                    <p>{{ item.timerange }}</p>
                  </div>
                </div>
                <div class="detail">
                  <div>
                    <p>小计</p>
                    <p>￥{{ item.money }}</p>
                  </div>
                  <div>
                    <p>运费</p>
                    <p>￥0</p>
                  </div>
                  <div style="margin-top: 40px; font-size: 30px;color: rgb(17, 151, 68);font-weight: bolder;">

                    <p>合计</p>
                    <p>￥{{ item.money }}</p>
                  </div>
                </div>
              </div>
            </div>
            <el-collapse class="collapse" v-model="activeNames" style="justify-content: flex-start;">
              <el-collapse-item title="商品详情" name="1" style="width: 100%;">
                <el-table :data="item.children" style="width: 100%" :stripe="true" class="table">
                  <el-table-column type="index" label="序号" width="180" align="center" />
                  <el-table-column label="图片" width="180" align="center">
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
                  <el-table-column prop="goodsName" label="商品名称" width="180" align="center" />
                  <el-table-column label="配送商" width="180" align="center">
                    <template #default="scope">
                      <el-tag type="success" style="height: 40px ;font-size:18px;">{{ userStore.distributionCompanyName
                      }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="价格" width="180" align="center">
                    <template #default="scope">
                      <p>￥{{ scope.row.price }} / {{ scope.row.goodsunit }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column prop="number" label="数量" width="180" align="center">
                    <template #default="scope">
                      <p>{{ scope.row.number }}({{ scope.row.goodsunit }})</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="合计" width="180" align="center">
                    <template #default="scope">
                      <p style="font-size: 24px;color: rgb(17, 151, 68);">￥{{ (scope.row.price *
                        scope.row.number).toFixed(2) }}</p>
                    </template>
                  </el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </div>

        </TransitionGroup>



        <el-pagination background layout="total, prev, pager, next,sizes , jumper , " :default-current-page="1"
          :default-page-size="10" :total="params.total" v-model:current-page="params.page"
          v-model:page-size="params.limit" :page-sizes="[5, 10, 20, 30]" :hide-on-single-page="false"
          style="background-color: white;margin-top: 30px; display: flex; justify-content: center;" />
      </div>

    </div>

    <el-dialog v-model="dialogTableVisible" title="签收订单" width="800">
      <el-table :data="receiveTable.children">
        <el-table-column label="序号" type="index" width="150" />
        <el-table-column property="goodsName" label="商品名" width="150" />
        <el-table-column property="number" label="订购数量" width="200" />
        <el-table-column label="实际成交量">
          <template #default="scope">
            <el-input v-model="scope.row.actualamount"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;
      justify-content: center;margin-top: 20px;" @click="dialogTableVisible = false"> <el-button>取消</el-button>
        <el-button type="success" @click="handeConfimReceive">确定签收</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useShoppingCartStore } from '@/stores/modules/shoppingCart.ts'
import { useUserStore } from '@/stores/modules/user.ts'
import { reqPurchaserOrderList, reqOrderCount, reqUpdateOrder, reqOrderReceive } from '@/api/purchaser/order/index.ts'
import { ElMessage } from 'element-plus'
import Hearder from '@/components/purchaser/header/Hearder.vue'
const shoppingCartStore = useShoppingCartStore()

const userStore = useUserStore()
const setp = ref(5)

const params = ref({
  page: 1,
  limit: 5,
  status: '',
  total: 0
})

const receiveTable = ref([])

const orderCount = ref({})

const orderArr = ref([])

onBeforeMount(() => {
  getOrderList()
  getOrderCount()
})

// 签收提示框
const dialogTableVisible = ref(false)

const activeNames = ref(0)

watch(params.value, () => {
  getOrderList()
})


// 点击取消订单
const handeCancel = async (id) => {
  const obj = {
    orderid: id,
    status: '7'
  }
  const res = await reqUpdateOrder(obj)
  tips("取消订单成功！", "取消订单失败！", res.code)
  if (res.code === 200) {
    getOrderList()
    getOrderCount()
  }
}
// 点击删除订单
const handeDelete = async (id) => {
  const obj = {
    orderid: id,
    status: '10'
  }
  const res = await reqUpdateOrder(obj)
  tips("订单删除成功！", "订单删除失败！", res.code)
  if (res.code === 200) {
    getOrderList()
    getOrderCount()
  }
}

// 点击确定签收
const handeConfimReceive = async () => {
  const res = await reqOrderReceive(receiveTable.value)
  tips("订单签收成功！", "点单签收失败！", res.code)
  getOrderList()
  getOrderCount()
}

// 点击签收
const handeReceive = async (order) => {
  dialogTableVisible.value = true
  console.log(order);
  receiveTable.value = order

  receiveTable.value.children.forEach(orderDetail => {
    orderDetail.actualamount = orderDetail.number
  })

}

// 更新订单状态
const updateOrder = async (data) => {

}

// 当step变化时
const onStepChange = (value) => {
  if (value === 5) {
    params.value.status = ''
  } else {
    params.value.status = value + ''
  }

}

// 获取各类订单状态的数量
const getOrderCount = async () => {
  const res = await reqOrderCount()
  if (res.data) {
    orderCount.value = res.data

  }
}

// 获取订单列表分页数据
const getOrderList = async () => {
  const res = await reqPurchaserOrderList(params.value)

  if (res.data) {
    orderArr.value = res.data.list
    params.value.total = res.data.totalCount
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
.leave {
  transition: 0s;
}



:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: rgba(17, 151, 68) !important;
}


.empty {
  margin: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.collapse {
  width: 100%;
}

p {
  margin: 0;
}


.order .detail>div>p {
  margin: 5px;
}

.order .detail>div {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  padding: 10px 20px;
  align-items: center;
  box-sizing: border-box;
}



.order .header>div {
  display: flex;
  justify-content: space-evenly;
}

.order .header {
  display: flex;
  flex-direction: column;
}

.order .detail {
  width: 600px;
  height: 250px;
  background-color: rgb(245, 245, 245);
  margin-left: 10px;
  margin: 10px;
  border-radius: 10px;
}

.order .detail:nth-child(1) {
  width: 800px;
}

.order>div {
  display: flex;
  justify-content: center;
  width: 100%;
}

.order .title {
  width: 100%;
  border-left: 5px solid rgb(17, 151, 68);
  font-size: 30px;
  height: 50px;
  padding-left: 15px;
  box-sizing: border-box;
  color: rgb(17, 151, 68);
  font-weight: bolder;
  display: flex;
  justify-content: space-between;
}

.order {
  /* background-color: aqua; */
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid rgb(17, 151, 68);
  box-sizing: border-box;
  padding-bottom: 20px;
  overflow: hidden;
}


.order:last-child {
  border-bottom: 0;
}

.step div {
  font-size: 20px;
}

.step {
  max-width: 5000px;
  display: flex;
  justify-content: center;
  padding-left: 100px;
  cursor: pointer;
}

.content>.header {
  width: 100%;
}

.content {}

p {
  margin: 0;
}

.container .content {
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0;
}

.container {
  padding: 40px 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  min-height: 62vh;
}
</style>