<template>
  <div class="container">
    <div style="background-color: white; display: flex;">
      <el-input v-model="parm.key" style="width: 240px" placeholder="单位名称" />
      <el-select v-model="parm.status" placeholder="状态" size="large" style="width: 100px; margin: 0 20px;">
        <el-option :value="1" label="合作中" />
        <el-option :value="0" label="已终止" />
        <el-option :value="2" label="申请中" />
        <el-option :value="3" label="合作申请" />
      </el-select>
      <div style="margin: 0 20px;">
        <el-button>搜索</el-button>
        <el-button @click="searchAll">检索全部</el-button>
        <el-button type="success" @click="addCustomer">新增</el-button>
      </div>
    </div>
    <el-table @selection-change="onSelected" :stripe="true" :highlight-current-row="true" max-height="400px"
      ref="tableRef" :data="customArr" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column property="companyname" label="单位名称" width="150" />
      <el-table-column property="addr" label="单位地址" show-overflow-tooltip />
      <el-table-column property="name" label="联系人" show-overflow-tooltip />
      <el-table-column property="phone" label="联系电话" show-overflow-tooltip />
      <el-table-column property="minamount" label="合作期限" show-overflow-tooltip>
        <template #default="scope">
          <div v-if="scope.row.islongrelation">
            <el-tag type="success">长期</el-tag>
          </div>
          <div v-else>
            {{ scope.row.begindate }} - {{ scope.row.enddate }}
          </div>
        </template>
      </el-table-column>
      <el-table-column property="status" label="合作状态" show-overflow-tooltip>
        <template #default="scope">
          <el-tag size="small" v-if="scope.row.status == 0" type="warning">已终止</el-tag>
          <el-tag size="small" v-if="scope.row.status == 1" type="success">合作中</el-tag>
          <el-tag size="small" v-else type="warning">申请中</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" type="danger" v-if="scope.row.status == 1"
            @click="handleDelete(scope.row)">终止合作</el-button>
          <el-button size="small" type="warning" v-if="scope.row.status == 2"
            @click="handleUnApply(scope.row.cooperationid)">取消申请</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="total, prev, pager, next,sizes , jumper , " :default-current-page="1"
      :default-page-size="5" :total="paginationObj.totalCount" v-model:current-page="parm.page"
      v-model:page-size="parm.limit" :page-sizes="[5, 10, 20, 30]"
      style="background-color: white;margin-top: 10px; display: flex; justify-content: center;" />

    <el-dialog v-model="dialogFormVisible" title="新增客户" width="500">
      <el-form :model="form" label-width="100">
        <el-form-item label="采购商名称" required>
          <el-select v-model="form.purchaserid" placeholder="请选择采购商" @change="onSelectChange">
            <el-option v-for="item in purchaserArr" :key="item.purchaserid" :label="item.companyname"
              :value="item.purchaserid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称" required>
          <el-tag v-if="purchaser.companyname">{{ purchaser.companyname }}</el-tag>
        </el-form-item>
        <el-form-item label="法人" required>
          <el-tag v-if="purchaser.name">{{ purchaser.name }}</el-tag>
        </el-form-item>
        <el-form-item label="联系方式" required>
          <el-tag v-if="purchaser.phone">{{ purchaser.phone }}</el-tag>
        </el-form-item>
        <el-form-item label="地址" required>
          <el-tag v-if="purchaser.addr">{{ purchaser.addr }}</el-tag>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handeApply">
            申请
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onBeforeMount, ref, reactive, watch } from "vue";
import { reqGoodsList, reqGoodsDetail, reqGoodsUpdate, reqGoodsDown, reqGoodsUp, reqGoodsDownList, reqGoodsUpList, reqGoodsSave } from '@/api/distributor/product/index.ts'
import { reqPurchaserList, reqUnCooperationList, reqApply, requnApply } from '@/api/distributor/customer/index.ts'
import { ElMessage } from 'element-plus'
// 表格元对象
let customArr = ref([])

const tableRef = ref()
const disabledButton = ref(true)


const dialogFormVisible = ref(false)

const onSelectChange = (id) => {
  const result = purchaserArr.value.filter(item => item.purchaserid === id)
  purchaser.value = result[0]
}

// 点击新增按钮
const addCustomer = async () => {
  dialogFormVisible.value = true
  const res = await reqUnCooperationList()
  purchaserArr.value = res.data
}

// 点击申请合作采购商
const handeApply = async () => {
  const res = await reqApply(form.value.purchaserid)
  tips("合作申请成功！", "合作申请失败", res.code)
  getCustomerList(parm)
  purchaser.value = {}
  form.value.purchaserid = ''
}

// 点击取消合作
const handleUnApply = async (id) => {
  const res = await requnApply(id)
  tips("取消合作成功", "取消合作失败", res.code)
  getCustomerList(parm)
}
const form = ref({
  purchaserid: ''
})

// 表单初始化
const initForm = () => {
  form.value.goodsname = ''
  form.value.goodsunit = ''
  form.value.price = 0
  form.value.minamount = 0
  form.value.goodsid = ''
}

const onSelected = () => {
  console.log(111);

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


watch(parm.value, (newValue, oldValue) => {

  getCustomerList(parm)
})

const paginationObj = ref({
  totalCount: 0,
})

onBeforeMount(async () => {
  getCustomerList(parm)
})

const purchaser = ref({})
const purchaserArr = ref([])



// 点击删除时
const handleDelete = (row) => { }

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
  getCustomerList(parm)
}

// 获取客户列表
const getCustomerList = async (parm) => {
  const res = await reqPurchaserList(parm.value)
  console.log(res);
  customArr.value = res.data.list
  paginationObj.value.totalCount = res.data.totalCount
}

</script>

<style scoped>
.container {
  width: 100%;
  background-color: white;
}
</style>