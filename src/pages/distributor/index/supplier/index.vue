<template>
  <div class="container">
    <div style="background-color: white; display: flex;">
      <el-input v-model.trim="parm.key" style="width: 240px" placeholder="检索商品名称" />
      <el-select v-model="parm.type" placeholder="供应商类型" size="large" style="width: 200px; margin: 0 20px;">
        <el-option :value="0" label="种植基地" />
        <el-option :value="1" label="专业合作社" />
      </el-select>
      <div style="margin: 0 20px;">
        <el-button>搜索</el-button>
        <el-button @click="searchAll">检索全部</el-button>
        <el-button type="success" @click="addGoods">新增</el-button>
      </div>
    </div>
    <el-table :stripe="true" :highlight-current-row="true" max-height="400px" ref="tableRef" :data="supplierArr"
      style="width: 100%">

      <el-table-column type="index" label="序号" width="60" />
      <el-table-column property="supplierCompanyName" label="供货商名称" width="120" />
      <el-table-column property="type" label="供货商类型" show-overflow-tooltip>
        <template #default="scope">
          <el-tag size="small" @click="handleEdit(scope.row)" v-if="scope.row.type == 0" type="success">种植基地</el-tag>
          <el-tag size="small" @click="handleEdit(scope.row)" v-else type="success">专业合作社</el-tag>
        </template>
      </el-table-column>
      <el-table-column property="supplieraddress" label="地址" show-overflow-tooltip />
      <el-table-column property="suppliername" label="负责人" show-overflow-tooltip />
      <el-table-column property="phone" label="联系电话" show-overflow-tooltip />

      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" type="warning" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="total, prev, pager, next,sizes , jumper , " :default-current-page="1"
      :default-page-size="5" :total="paginationObj.totalCount" v-model:current-page="parm.page"
      v-model:page-size="parm.limit" :page-sizes="[5, 10, 20, 30]"
      style="background-color: white;margin-top: 10px; display: flex; justify-content: center;" />

    <el-dialog v-model="dialogFormVisible" :title="form.supplierid ? '修改供应商信息' : '新增供货商信息'" width="500">
      <el-form :model="form" label-width="100">
        <el-form-item label="供货商名称" required>
          <el-input v-model="form.supplierCompanyName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="供货商类型" required>
          <el-select v-model="form.type" placeholder="供应商类型" size="large">
            <el-option :value="'0'" label="种植基地" />
            <el-option :value="'1'" label="专业合作社" />
          </el-select>
        </el-form-item>
        <el-form-item label="地址" required>
          <el-input v-model="form.supplieraddress" autocomplete="off" />
        </el-form-item>
        <el-form-item label="负责人" required>
          <el-input v-model="form.suppliername" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系电话" required>
          <el-input v-model="form.phone" autocomplete="off" />
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
import { reqSupplierByUser, reqSupplierPageByUser, reqSupplierInfo, reqSupplierUpdate, reqSupplierSave } from '@/api/distributor/supplier/index.ts'
import { ElMessage } from 'element-plus'
// 表格元对象
let supplierArr = ref([])

const tableRef = ref()
const disabledButton = ref(true)


const dialogFormVisible = ref(false)

const form = ref({
  supplierid: '',
  supplierCompanyName: '',
  type: '',
  suppliername: '',
  supplieraddress: '',
  phone: ''
})

// 表单初始化
const initForm = () => {
  form.value.supplierid = ''
  form.value.supplierCompanyName = ''
  form.value.type = ''
  form.value.suppliername = ''
  form.value.phone = ''
  form.value.supplieraddress = ''
}

// 请求参数
const parm = ref({
  page: 1,
  limit: 5,
  type: '',
  key: ''
})


watch(parm.value, (newValue, oldValue) => {
  getSupplier(parm)
})

const paginationObj = ref({
  totalCount: 0,
})

onBeforeMount(async () => {
  getSupplier(parm)
})


// 点击新增供货商信息
const addGoods = async () => {
  initForm()
  dialogFormVisible.value = true
}


// 点击修改时
const handleEdit = async (row) => {
  const res = await reqSupplierInfo(row.supplierid)
  form.value.phone = res.supplier.phone
  form.value.suppliername = res.supplier.suppliername
  form.value.type = res.supplier.type
  form.value.supplierCompanyName = res.supplier.supplierCompanyName
  form.value.supplierid = res.supplier.supplierid
  form.value.supplieraddress = res.supplier.supplieraddress
  dialogFormVisible.value = true

}
// 点击删除时
const handleDelete = (row) => { }

// 修改或保存当前表单
const saveOrUpdateProduct = async () => {
  // 如果有id就是修改
  if (form.value.supplierid) {
    try {
      const res = await reqSupplierUpdate(form.value)
      tips("更新成功", "更新失败", res.code)
    } catch (error) {
      ElMessage({
        type: 'error',
        message: form.value.supplierid ? '更新失败' : '保存失败'
      })
    } finally {
      initForm()
      dialogFormVisible.value = false
      getSupplier(parm.value)
    }
  } else {
    try {
      const res = await reqSupplierSave(form.value)
      tips(`新增供货商信息【${form.value.supplierCompanyName}】成功`, `新增供货商信息【${form.value.supplierCompanyName}】失败`, res.code)

    } catch (error) {
      ElMessage({
        type: 'error',
        message: form.value.supplierid ? '更新失败' : '保存失败'
      })
    } finally {
      initForm()
      getSupplier(parm.value)
      dialogFormVisible.value = false
    }
  }
}

// 检索全部
const searchAll = () => {
  parm.value.key = '';
  parm.value.page = 1;
  parm.value.limit = 5;
  parm.value.type = '';
  getSupplier(parm)
}

// 获取供货商列表
const getSupplier = async (parm) => {
  const res = await reqSupplierPageByUser(parm.value)
  supplierArr.value = res.page.list
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
</style>