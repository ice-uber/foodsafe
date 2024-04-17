<template>
  <div class="container">
    <div style="background-color: white; display: flex;">
      <el-input v-model.trim="orderStore.params.orderNo" style="width: 240px" placeholder="订单编号" />
      <el-input v-model.trim="orderStore.params.purchaserName" style="width: 240px" placeholder="采购商名称" />
      <el-date-picker v-model="orderStore.params.startDate" type="date" placeholder="配送起始日期"
        :default-value="new Date()" />
      <el-date-picker v-model="orderStore.params.endDate" type="date" placeholder="配送结束日期" :default-value="new Date()" />
      <div style="margin: 0 20px;">
        <el-button>搜索</el-button>
        <el-button @click="searchAll">检索全部</el-button>
      </div>
    </div>
    <el-tabs v-model="orderStore.params.status" :stretch="true" tab-position="right" class="tabs">

      <el-tab-pane label="全部订单" name="-1">
        <OrderTable v-if="orderStore.params.status === '-1'"></OrderTable>
      </el-tab-pane>

      <el-tab-pane label="待受理" name="0">
        <el-button type="success">批量受理订单</el-button>
        <el-table @selection-change="onSelected" :stripe="true" :highlight-current-row="true" max-height="400px"
          ref="tableRef" :data="orderStore.orderArr" style="width: 100%">
          <el-table-column type="expand">
            <template #default="props">
              <div style="margin-left: 150px;">
                <el-table :data="props.row.children">
                  <el-table-column label="商品名称" prop="goodsName" />
                  <el-table-column label="单价" prop="price" />
                  <el-table-column label="下单量" prop="amount" />
                  <el-table-column label="来源填报" prop="price">
                    <template #default="scope">
                      <el-tag size="small" v-if="scope.row.supplierid" type="success">已填报</el-tag>
                      <el-tag size="small" v-else type="warning">未填报</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="检测结果" prop="price" />
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column property="orderno" label="订单编号" width="180" show-overflow-tooltip />
          <el-table-column property="money" label="订单金额" width="100" show-overflow-tooltip />
          <el-table-column property="purchaserName" label="采购商" width="100" show-overflow-tooltip />
          <el-table-column property="address" label="收货地址" width="110" show-overflow-tooltip />
          <el-table-column property="distributiondate" label="配送时间" width="110" show-overflow-tooltip />
          <el-table-column property="addtime" label="下单时间" width="110" show-overflow-tooltip />
          <el-table-column property="status" label="订单状态" width="80" show-overflow-tooltip>
            <template #default="scope">
              <el-tag size="small" v-if="scope.row.status == 0" type="warning">待受理</el-tag>
              <el-tag size="small" v-if="scope.row.status == 1" type="warning">待发货</el-tag>
              <el-tag size="small" v-if="scope.row.status == 2" type="success">已发货</el-tag>
              <el-tag size="small" v-if="scope.row.status == 3" type="success">已签收</el-tag>
              <el-tag size="small" v-if="scope.row.status == 4" type="success">已完成</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button size="small" type="success" @click="handleAcceptOrUnAccept(scope.row, 1)">确认受理</el-button>
              <el-button size="small" type="danger" @click="handleAcceptOrUnAccept(scope.row, 0)">拒绝受理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="待发货" name="1">
        <!-- <el-button type="success">生成备货单</el-button> -->
        <el-button type="success" @click="handleBacthInputSourceBtn">批量填报来源</el-button>
        <el-button type="success" @click="handleBacthOrderOut">批量订单出库</el-button>
        <el-table table-layout="auto" @selection-change="onSelected" :stripe="true" :highlight-current-row="true"
          max-height="400px" ref="tableRef" :data="orderStore.orderArr" style="width: 100%">
          <el-table-column type="expand">
            <template #default="props">
              <div style="margin-left: 150px;">
                <el-table :data="props.row.children">
                  <el-table-column label="商品名称" prop="goodsName" />
                  <el-table-column label="单价" prop="price" />
                  <el-table-column label="下单量" prop="amount" />
                  <el-table-column label="来源填报" prop="price">
                    <template #default="scope">
                      <el-tag size="small" v-if="scope.row.supplierid" type="success">已填报</el-tag>
                      <el-tag size="small" v-else type="warning">未填报</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="检测结果" prop="price" />
                  <el-table-column label="操作">
                    <template #default="scope">
                      <el-button type="success" size="small" v-if="!scope.row.supplierid">填报来源</el-button>
                      <el-button type="warning" size="small" v-else>修改来源</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column property="orderno" label="订单编号" width="180" show-overflow-tooltip />
          <el-table-column property="money" label="订单金额" width="100" show-overflow-tooltip />
          <el-table-column property="purchaserName" label="采购商" width="100" show-overflow-tooltip />
          <el-table-column property="address" label="收货地址" width="110" show-overflow-tooltip />
          <el-table-column property="distributiondate" label="配送时间" width="110" show-overflow-tooltip />
          <el-table-column property="addtime" label="下单时间" width="110" show-overflow-tooltip />
          <el-table-column property="status" label="订单状态" width="80" show-overflow-tooltip>
            <template #default="scope">
              <el-tag size="small" v-if="scope.row.status == 0" type="warning">待受理</el-tag>
              <el-tag size="small" v-if="scope.row.status == 1" type="warning">待发货</el-tag>
              <el-tag size="small" v-if="scope.row.status == 2" type="success">已发货</el-tag>
              <el-tag size="small" v-if="scope.row.status == 3" type="success">已签收</el-tag>
              <el-tag size="small" v-if="scope.row.status == 4" type="success">已完成</el-tag>
            </template>
          </el-table-column>


          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button size="small" type="success" @click="handleOrderInputSource(scope.row)">填报来源</el-button>
              <el-button size="small" type="danger" @click="orderOut(scope.row)">订单出库</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>

      <el-tab-pane label="已发货" name="2">
        <OrderTable v-if="orderStore.params.status === '2'"></OrderTable>
      </el-tab-pane>

      <el-tab-pane label="已签收" name="3">
        <OrderTable v-if="orderStore.params.status === '3'"></OrderTable>
      </el-tab-pane>

      <el-tab-pane label="已完成" name="4">
        <OrderTable v-if="orderStore.params.status === '4'"></OrderTable>
      </el-tab-pane>

    </el-tabs>

    <el-pagination background layout="total, prev, pager, next,sizes , jumper , " :default-current-page="1"
      :default-page-size="5" :total="orderStore.params.totalCount" v-model:current-page="orderStore.params.page"
      v-model:page-size="orderStore.params.limit" :page-sizes="[5, 10, 20, 30]"
      style="background-color: white;margin-top: 10px; display: flex; justify-content: center;" />

    <el-dialog v-model="sourceFormVisible" :title="isBacthSave ? `批量填报来源` : `填报来源 &ensp; &ensp; &ensp;订单号：${orderNo}`"
      width="1000">
      <el-row>
        <el-col v-if="isBacthSave" :span="8">
          <el-table table-layout="auto" @selection-change="onSelected" :stripe="true" :highlight-current-row="true"
            max-height="400px" ref="orderSourceTableRef" :data="orderStore.orderArr" style="width: 100%">
            <el-table-column type="selection" width="55" />
            <el-table-column label="序号" type="index" width="60" />
            <el-table-column label="订单编号" property="orderno" />
            <el-table-column label="采购商" property="purchaserName">
              <template #default="scope">
                <el-tag size="small" type="warning">{{ scope.row.purchaserName }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col v-else :span="8">
          <el-table table-layout="auto" @selection-change="onSelected" :stripe="true" :highlight-current-row="true"
            max-height="400px" ref="goodsTableRef" :data="goodsList" style="width: 100%">
            <el-table-column type="selection" width="55" />
            <el-table-column label="序号" type="index" width="60" />
            <el-table-column label="商品" property="goodsName" />
            <el-table-column label="填报状态">
              <template #default="scope">
                <el-tag size="small" v-if="scope.row.hasInputSource" type="success">已填报</el-tag>
                <el-tag size="small" v-else type="warning">未填报</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-col>



        <el-col :span="6">
          <el-form :model="orderSourceForm">
            <el-form-item label="供货商" :label-width="formLabelWidth" required>
              <el-select @change="suplierSelectorChange" v-model="sourceForm.supplierId">
                <el-option v-for="item in supplierList" :label="item.supplierCompanyName" :value="item.supplierid"
                  :key="item.supplierid"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="供货商类型" :label-width="formLabelWidth">
              <el-tag v-if="supplierMessage.type === '0'">种植基地</el-tag>
              <el-tag v-if="supplierMessage.type === '1'">专业合作社</el-tag>
            </el-form-item>
            <el-form-item label="供货商地址" :label-width="formLabelWidth">
              <el-tag v-if="supplierMessage.address">{{ supplierMessage.address }}</el-tag>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth">
              <el-tag v-if="supplierMessage.person">{{ supplierMessage.person }}</el-tag>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
              <el-tag v-if="supplierMessage.tel">{{ supplierMessage.tel }}</el-tag>
            </el-form-item>
            <el-form-item label="进货日期" :label-width="formLabelWidth" required>
              <el-date-picker v-model="sourceForm.purchaseTime" type="date" value-format="YYYY-MM-DD"
                placeholder="选择进货日期" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8" style="display: flex; justify-content: center;">
          <el-upload class="avatar-uploader" action="/api/admin/common/upload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <el-image v-if="imageUrl" :src="imageUrl" fit="cover" style="  width: 178px;
  height: 178px;" />
            <div v-else style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <el-icon class="avatar-uploader-icon">
                <Plus />
              </el-icon>
              <el-tag type="success">请上传凭证</el-tag>
            </div>
          </el-upload>
        </el-col>
      </el-row>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="sourceFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveSource">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onBeforeMount, ref, reactive, watch } from "vue";
import { reqOrderList, reqAcceptOrUnacceptOrder, reqOrderOut, reqGoodsList, reqSaveOrderGoodsSourceOrBacthGoodsSource, reqOrderOutList } from '@/api/distributor/order/index.ts'
import { reqSupplierByUser } from '@/api/distributor/supplier/index.ts'
import { ElMessage } from 'element-plus'
import OrderTable from '@/pages/distributor/index/order/table/index.vue'
import { useOrderStore } from '@/stores/modules/order.ts'
import { get } from "http";
import { Plus } from '@element-plus/icons-vue'
import { tr } from "element-plus/es/locale";


defineComponent({
  OrderTable,
  Plus
})


// 填报来源表单内信息对象
const supplierMessage = ref({
  type: '',
  address: '',
  person: '',
  tel: ''
})

const initSupplier = () => {
  supplierMessage.value.type = ''
  supplierMessage.value.address = ''
  supplierMessage.value.tel = ''
  supplierMessage.value.person = ''
}


// 订单条件存储库
const orderStore = useOrderStore()

const formLabelWidth = ref(100)

// 表单内的商品列表
const goodsList = ref([])
const supplierList = ref([])


// 表格元对象
let orderArr = ref([])

const orderNo = ref('')



const tableRef = ref()
const goodsTableRef = ref()
const orderSourceTableRef = ref()
const disabledButton = ref(true)

const sourceFormVisible = ref(false)

// 是否是批量保存
const isBacthSave = ref(false)

//配送商表单
const sourceForm = ref({
  supplierId: '',
  purchaseTime: '',
  pzurl: '',
  orderDetailIds: [],
  orderIdList: []
})

// 初始化配送商表单
const initSourceForm = () => {
  sourceForm.value.supplierId = ''
  sourceForm.value.purchaseTime = ''
  sourceForm.value.pzurl = ''
  sourceForm.value.orderDetailIds = []
  sourceForm.value.orderIdList = []
}


const orderSourceForm = ref({
  money: '',
  purchaserid: '',
  actualmoney: 0,
  address: 0,
  goodsid: ''
})

let imageUrl = ref('')

// 文件上传前
const beforeAvatarUpload = () => { }

// 文件上传成功
const handleAvatarSuccess = (res) => {
  imageUrl.value = res.data
  sourceForm.value.pzurl = res.data
  tips("凭证上传成功！", "凭证上传失败", 200)
}

// 点击批量订单出库
const handleBacthOrderOut = async () => {
  const rows = tableRef.value.getSelectionRows()
  const orderIds = rows.filter(item => item.orderid && !item.goodsid).map(item => item.orderid)
  if (orderIds.length) {
    const res = await reqOrderOutList(orderIds)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: `订单批量出库成功`
      })
      getOrder()
    } else {
      const goodsNameArr = res.data
      ElMessage({
        type: 'error',
        message: `订单商品【${goodsNameArr}】尚未填写来源！`
      })
    }

  } else {
    ElMessage({
      type: 'error',
      message: "请先选择要出库的订单"
    })
  }

}

// 当供应商选择框发生变化时 
const suplierSelectorChange = (supplierId) => {
  const res = supplierList.value.filter(item => item.supplierid === supplierId)
  const supplierObj = res[0]
  supplierMessage.value.address = supplierObj.supplieraddress
  supplierMessage.value.tel = supplierObj.phone
  supplierMessage.value.type = supplierObj.type
  supplierMessage.value.person = supplierObj.suppliername

}

const onSelected = () => {
  const selecetedRow = tableRef.value.getSelectionRows()
  selecetedRow.length ? disabledButton.value = false : disabledButton.value = true
}

// 点击批量填报来源
const handleBacthInputSourceBtn = async () => {
  initSupplier()
  isBacthSave.value = true
  sourceFormVisible.value = true

  imageUrl.value = ''
  const supplierRes = await reqSupplierByUser()
  supplierList.value = supplierRes.data
}

// 点击确定保存订单详情来源
const handleSaveSource = async () => {

  // 是否是批量保存
  if (isBacthSave.value) {
    const rows = orderSourceTableRef.value.getSelectionRows()
    if (!rows.length) {
      ElMessage({
        type: 'error',
        message: '请选择填报来源商品！'
      })
      return
    }

    if (sourceForm.value.pzurl && sourceForm.value.supplierId && sourceForm.value.purchaseTime) {
      const orderIds = rows.map(item => item.orderid)
      sourceForm.value.orderIdList = orderIds
      const res = await reqSaveOrderGoodsSourceOrBacthGoodsSource(sourceForm.value)
      tips("批量填写商品来源成功", "批量填写商品来源失败", 200)
      sourceFormVisible.value = false
      getOrder()
    } else {
      ElMessage({
        type: 'error',
        message: '请填写必要信息！'
      })
    }


  } else {
    const rows = goodsTableRef.value.getSelectionRows()
    if (!rows.length) {
      ElMessage({
        type: 'error',
        message: '请选择填报来源商品！'
      })
      return
    }
    if (sourceForm.value.pzurl && sourceForm.value.supplierId && sourceForm.value.purchaseTime) {
      const orderDetailIds = rows.map(item => item.orderdetailid)
      sourceForm.value.orderDetailIds = orderDetailIds
      const res = await reqSaveOrderGoodsSourceOrBacthGoodsSource(sourceForm.value)
      tips("填写商品来源成功", "填写商品来源失败", 200)
      sourceFormVisible.value = false
      getOrder()
    } else {
      ElMessage({
        type: 'error',
        message: '请填写必要信息！'
      })
    }
  }


}

// 点击填报订单详情来源
const handleOrderInputSource = async (row) => {
  isBacthSave.value = false
  initSourceForm()
  initSupplier()
  imageUrl.value = ''
  const res = await reqGoodsList(row.orderid)
  orderNo.value = row.orderno
  goodsList.value = res.data
  const supplierRes = await reqSupplierByUser()
  supplierList.value = supplierRes.data
  sourceFormVisible.value = true
}

// 点击删除时
const handleDelete = (row) => { }

// 点击确认受理时
const handleAcceptOrUnAccept = async (row, status) => {
  const res = await reqAcceptOrUnacceptOrder(`${row.orderid}/${status}`)
  status ? tips(`订单${row.orderno}受理成功`, `订单${row.orderno}受理失败`, 200) : tips(`订单${row.orderno}拒绝受理成功`, `订单${row.orderno}拒绝受理失败`, 200)
  getOrder()
}


// 当点击订单出库时
const orderOut = async (row) => {
  const res = await reqOrderOut(row.orderid)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: `订单${row.orderno}出库成功`
    })
    getOrder()
  } else {
    const goodsNameArr = res.data
    ElMessage({
      type: 'error',
      message: `订单商品【${goodsNameArr}】尚未填写来源！`
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
  orderStore.params.page = 1
  orderStore.params.limit = 5
  orderStore.params.orderNo = ''
  orderStore.params.purchaserName = ''
  orderStore.params.startDate = ''
  orderStore.params.endDate = ''
  orderStore.params.status = '-1'

}

// 获取订单列表
const getOrder = async () => {
  const res = await reqOrderList(orderStore.params)
  orderStore.orderArr = res.page.list
  orderStore.params.totalCount = res.page.totalCount
}

// 监视存储库中的status 发生变化时重新获取数据
watch(orderStore.params, (newValue, oldValue) => {
  getOrder()
}, { immediate: true })
</script>

<style scoped>
.container {
  width: 100%;
  background-color: white;
}

.tabs {
  height: 100%;
}

.avatar-uploader>>>.el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader>>>.el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>