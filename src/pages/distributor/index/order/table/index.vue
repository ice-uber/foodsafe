<template>
  <div>
    <el-table border table-layout="auto" @selection-change="orderStore.onSelected" :stripe="true"
      :highlight-current-row="true" max-height="400px" ref="tableRef" :data="orderStore.orderArr" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column type="expand">
        <template #default="props">
          <div style="margin-left: 150px;">
            <el-table :data="props.row.children">
              <el-table-column label="商品序号" width="80" type="index" />
              <el-table-column label="商品名称" prop="goodsName" />
              <el-table-column label="单价" prop="price" />
              <el-table-column label="下单量" prop="amount" />
              <el-table-column label="来源填报">
                <template #default="scope">
                  <el-tag size="small" v-if="scope.row.supplierid" type="success">已填报</el-tag>
                  <el-tag size="small" v-else type="warning">未填报</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="检测结果">
                <template #default="scope">
                  <el-tag size="small" type="danger">未检测</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="orderno" label="订单编号" width="180" show-overflow-tooltip />
      <el-table-column property="money" label="订单金额" width="" show-overflow-tooltip />
      <el-table-column property="purchaserName" label="采购商" width="" show-overflow-tooltip />
      <el-table-column property="address" label="收货地址" width="" show-overflow-tooltip />
      <el-table-column property="addtime" label="下单时间" width="" show-overflow-tooltip />
      <el-table-column property="distributiondate" label="配送时间" width="" show-overflow-tooltip />

      <el-table-column property="status" label="订单状态" width="" show-overflow-tooltip>
        <template #default="scope">
          <el-tag size="small" v-if="scope.row.status == 0" @click="orderStore.params.status = '0'"
            type="warning">待受理</el-tag>
          <el-tag size="small" v-if="scope.row.status == 1" @click="orderStore.params.status = '1'"
            type="warning">待发货</el-tag>
          <el-tag size="small" v-if="scope.row.status == 2" @click="orderStore.params.status = '2'"
            type="success">已发货</el-tag>
          <el-tag size="small" v-if="scope.row.status == 3" @click="orderStore.params.status = '3'"
            type="success">已签收</el-tag>
          <el-tag size="small" v-if="scope.row.status == 4" @click="orderStore.params.status = '4'"
            type="success">已完成</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="" show-overflow-tooltip>

        <template #default="scope">
          <el-button v-if="scope.row.status === '2'" size="small" type="success">提醒收货</el-button>
          <el-button v-if="scope.row.status === '3'" size="small" type="success"
            @click="handeFinish(scope.row.orderid)">完成订单</el-button>
          <el-button v-if="scope.row.status === '4'" size="small" type="danger">删除订单</el-button>
          <el-button v-if="scope.row.status === '5'" size="small" type="danger">删除订单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onBeforeMount, ref, reactive, watch } from "vue";
import { reqOrderList } from '@/api/distributor/order/index.ts'
import { ElMessage } from 'element-plus'
import { useOrderStore } from '@/stores/modules/order.ts'
import { reqPurchaserOrderList, reqOrderCount, reqUpdateOrder } from '@/api/purchaser/order/index.ts'
import { reqFinishOrder } from '@/api/distributor/order/index.ts'

// 订单条件存储库
const orderStore = useOrderStore()

const tableRef = ref()
const disabledButton = ref(true)





const dialogFormVisible = ref(false)

const form = ref({
  goodsname: '',
  goodsunit: '',
  price: 0,
  minamount: 0,
  goodsid: ''
})



// 表单初始化
const initForm = () => {
  form.value.goodsname = ''
  form.value.goodsunit = ''
  form.value.price = 0
  form.value.minamount = 0
  form.value.goodsid = ''
}

// 点击完成订单
const handeFinish = async (id) => {
  const res = await reqFinishOrder(id)
  tips("订单完成成功！", "订单完成失败！", res.code)
  if (res.code === 200) {
    getOrder()
  }
}


const onSelected = () => {
  const selecetedRow = tableRef.value.getSelectionRows()
  selecetedRow.length ? disabledButton.value = false : disabledButton.value = true
}

// 请求参数
const parm = ref({
  page: 1,
  limit: 5,
  status: '',
  key: ''
})



const paginationObj = ref({
  totalCount: 0,
})

onBeforeMount(async () => {
  searchAll()
})

// 获取订单列表
const getOrder = async () => {
  const res = await reqOrderList(orderStore.params)
  orderStore.orderArr = res.page.list
  orderStore.params.totalCount = res.page.totalCount
}

// 点击修改时
const handleEdit = async (row) => {
  const res = await reqGoodsDetail(row.goodsid)

  form.value.goodsname = res.goods.goodsname
  form.value.goodsunit = res.goods.goodsunit
  form.value.price = res.goods.price
  form.value.minamount = res.goods.minamount
  form.value.goodsid = res.goods.goodsid
  dialogFormVisible.value = true

}

// 点击上架时
const handleUp = async (row) => {
  const res = await reqGoodsUp(row.goodsid)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: row.goodsname + '上架成功'

    })
    getGoods(parm)
  } else {
    ElMessage({
      type: 'error',
      message: row.goodsname + '上架失败'
    })
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


// 检索全部
const searchAll = () => {
  parm.value.key = '';
  parm.value.page = 1;
  parm.value.limit = 5;
  parm.value.status = '';
  parm.value.key = '';
}




</script>

<style lang="scss" scoped></style>