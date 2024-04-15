<template>
  <div class="container">
    <div style="background-color: white; display: flex;">
      <el-select v-model="parm.purchaserid" placeholder="选择采购商" size="large" style="width: 200px; margin: 0 20px;">
        <el-option :value="item.purchaserId" :label="item.purchaserName" v-for=" item in purchaserArr"
          :key="item.purchaserId" />
      </el-select>
      <el-date-picker v-model="parm.startDate" type="date" placeholder="配送起始日期" :default-value="new Date()" />
      <el-date-picker v-model="parm.endDate" type="date" placeholder="配送结束日期" :default-value="new Date()" />
      <div style="margin: 0 20px;">
        <el-button>搜索</el-button>
        <el-button @click="searchAll">检索全部</el-button>
      </div>
    </div>
    <div class="title">
      <p style="margin:0">共查到<el-tag style="font-size:20px" type="success" size="large">{{ titleMessage.totalNumber
      }}</el-tag>条记录 总金额：<el-tag style="font-size:20px" type="danger" size="large">{{ titleMessage.totalMoney
}}</el-tag>元</p>
      <el-button style="margin: 0 10px;" type="success">导出</el-button>

    </div>
    <el-table :max-height="330" :stripe="true" :highlight-current-row="true" ref="tableRef" :data="orderDetailArr"
      style="width: 100%">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column property="orderno" label="订单编号" width="180" />
      <el-table-column property="goodsName" label="商品名称" show-overflow-tooltip>
        <template #default="scope">
          <el-tag size="small" style="font-size:15px;" type="success">{{ scope.row.goodsName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column property="purchaserName" label="采购商" show-overflow-tooltip />
      <el-table-column property="amount" label="下单量" show-overflow-tooltip />
      <el-table-column property="actualamount" label="成交量" show-overflow-tooltip />
      <el-table-column property="price" label="单价（元）" show-overflow-tooltip />
      <el-table-column property="signtime" label="签收时间" width="190" show-overflow-tooltip />
      <el-table-column property="totalMoney" label="金额(元)" show-overflow-tooltip />
    </el-table>

    <el-pagination background layout="total, prev, pager, next,sizes , jumper , " :default-current-page="1"
      :default-page-size="5" :total="paginationObj.totalCount" v-model:current-page="parm.page"
      v-model:page-size="parm.limit" :page-sizes="[5, 10, 20, 30]"
      style="background-color: white;margin-top: 10px; display: flex; justify-content: center;" />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onBeforeMount, ref, reactive, watch } from "vue";
import { reqOrderDetailsList, reqTotal, reqPurchaserList } from '@/api/distributor/statement_account/index.ts'
import { ElMessage } from 'element-plus'
// 表格元对象
let orderDetailArr = ref([])

const tableRef = ref()

const purchaserArr = ref([])

// 请求参数
const parm = ref({
  page: 1,
  limit: 5,
  type: '',
  purchaserid: '',
  startDate: '',
  endDate: ''
})


watch(parm.value, (newValue, oldValue) => {
  getOrderDetail(parm)
})

const paginationObj = ref({
  totalCount: 0,
})

onBeforeMount(async () => {
  getOrderDetail(parm)
  getTotal()
  getPurchaserList()
})

// 标题信息对象
const titleMessage = ref({
  totalMoney: '',
  totalNumber: ''
})


// 检索全部
const searchAll = () => {
  parm.value.page = 1;
  parm.value.limit = 5;
  parm.value.type = '';
  parm.value.startDate = '';
  parm.value.endDate = '';
  getOrderDetail(parm)
}


// 获取订单总数
const getTotal = async () => {
  const res = await reqTotal()
  titleMessage.value.totalMoney = res.data.totalMoney
  titleMessage.value.totalNumber = res.data.totalNumber

}

// 获取订单详情列表
const getOrderDetail = async (parm) => {
  const res = await reqOrderDetailsList(parm.value)
  orderDetailArr.value = res.page.list
  paginationObj.value.totalCount = res.page.totalCount
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
.container {
  width: 100%;
  background-color: white;
}

.title {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  border-left: 4px solid rgb(103, 204, 155);
}
</style>