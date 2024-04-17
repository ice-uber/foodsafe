<template>
  <div class="container">
    <div style="background-color: white; display: flex;">
      <el-input v-model="parm.key" style="width: 240px" placeholder="单位名称" />
      <el-select v-model="parm.status" placeholder="状态" size="large" style="width: 100px; margin: 0 20px;">
        <el-option :value="1" label="合作中" />
        <el-option :value="0" label="已终止" />
      </el-select>
      <div style="margin: 0 20px;">
        <el-button>搜索</el-button>
        <el-button @click="searchAll">检索全部</el-button>
        <el-button type="success" @click="addGoods">新增</el-button>
      </div>
    </div>
    <el-table @selection-change="onSelected" :stripe="true" :highlight-current-row="true" max-height="400px"
      ref="tableRef" :data="customArr" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column property="companyname" label="单位名称" width="120" />
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
          <el-tag size="small" @click="handleEdit(scope.row)" v-if="scope.row.status == 0" type="warning">已终止</el-tag>
          <el-tag size="small" @click="handleEdit(scope.row)" v-else type="success">合作中</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" type="warning" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">终止合作</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="total, prev, pager, next,sizes , jumper , " :default-current-page="1"
      :default-page-size="5" :total="paginationObj.totalCount" v-model:current-page="parm.page"
      v-model:page-size="parm.limit" :page-sizes="[5, 10, 20, 30]"
      style="background-color: white;margin-top: 10px; display: flex; justify-content: center;" />

    <el-dialog v-model="dialogFormVisible" :title="form.goodsid ? '修改商品' : '新增商品'" width="500">
      <el-form :model="form" label-width="100">
        <el-form-item label="商品名称" required>
          <el-input v-model="form.goodsname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="计量单位" required>
          <el-input v-model="form.goodsunit" autocomplete="off" />
        </el-form-item>
        <el-form-item label="单价" required>
          <el-input v-model="form.price" autocomplete="off" />
        </el-form-item>
        <el-form-item label="起订量" required>
          <el-input v-model="form.minamount" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="saveOrUpdateProduct">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onBeforeMount, ref, reactive, watch } from "vue";
import { reqGoodsList, reqGoodsDetail, reqGoodsUpdate, reqGoodsDown, reqGoodsUp, reqGoodsDownList, reqGoodsUpList, reqGoodsSave } from '@/api/distributor/product/index.ts'
import { reqPurchaserList } from '@/api/distributor/customer/index.ts'
import { ElMessage } from 'element-plus'
// 表格元对象
let customArr = ref([])

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


// 点击新增商品
const addGoods = async () => {
  initForm()
  dialogFormVisible.value = true
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

// 修改或保存当前表单
const saveOrUpdateProduct = async () => {
  // 如果有id就是修改
  if (form.value.goodsid) {
    try {
      const res = await reqGoodsUpdate(form.value)
      tips("更新成功", "更新失败", res.code)

    } catch (error) {
      ElMessage({
        type: 'error',
        message: form.value.goodsid ? '更新失败' : '保存失败'
      })
    } finally {
      initForm()
      dialogFormVisible.value = false
    }
  } else {
    try {
      const res = await reqGoodsSave(form.value)
      getCustomerList(parm)
      tips(`新增商品【${form.value.goodsname}】成功`, `新增商品【${form.value.goodsname}】失败`, res.code)

    } catch (error) {
      ElMessage({
        type: 'error',
        message: form.value.goodsid ? '更新失败' : '保存失败'
      })
    } finally {
      initForm()
      dialogFormVisible.value = false
    }
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