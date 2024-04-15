<template>
  <div class="container">
    <div style="background-color: white; display: flex;">
      <!-- <el-tree-select v-model="value" :data="data" :render-after-expand="false"
        style="width: 100px; margin-right: 20px;" /> -->
      <el-input v-model="parm.key" style="width: 240px" placeholder="检索商品名称" />
      <el-select v-model="parm.status" placeholder="状态" size="large" style="width: 100px; margin: 0 20px;">
        <el-option :value="1" label="上架中" />
        <el-option :value="0" label="已下架" />
      </el-select>
      <div style="margin: 0 20px;">
        <el-button>搜索</el-button>
        <el-button @click="searchAll">检索全部</el-button>
        <el-button type="danger" @click="listDown" :disabled="disabledButton">批量下架</el-button>
        <el-button type="danger" @click="listUp" :disabled="disabledButton">批量上架</el-button>
        <el-button type="success" @click="addGoods">新增</el-button>
      </div>
    </div>
    <el-table @selection-change="onSelected" :stripe="true" :highlight-current-row="true" max-height="400px"
      ref="tableRef" :data="goosArr" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column label="商品图片" width="120">
        <template #default="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.goodsimg" fit="cover">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column property="categoryName" label="商品分类" width="120" />
      <el-table-column property="goodsname" label="商品名称" show-overflow-tooltip />
      <el-table-column property="goodsunit" label="计量单位" show-overflow-tooltip />
      <el-table-column property="price" label="单价（元）" show-overflow-tooltip />
      <el-table-column property="minamount" label="起订量" show-overflow-tooltip />
      <el-table-column property="status" label="状态" show-overflow-tooltip>
        <template #default="scope">
          <el-tag size="small" @click="handleEdit(scope.row)" v-if="scope.row.status == 0" type="warning">下架中</el-tag>
          <el-tag size="small" @click="handleEdit(scope.row)" v-else type="success">上架中</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="handleUp(scope.row)" v-if="scope.row.status == 0" type="success">上架</el-button>
          <el-button size="small" @click="handleDown(scope.row)" v-else type="warning">下架</el-button>
          <el-button size="small" type="danger" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handedeletegoods(scope.row)">删除</el-button>
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
        <el-form-item label="商品图片" required><el-upload class="avatar-uploader" action="/api/admin/common/upload"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <el-image v-if="form.goodsimg" :src="form.goodsimg" fit="cover" style="  width: 178px;
  height: 178px;" />
            <div v-else style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <el-icon class="avatar-uploader-icon">
                <Plus />
              </el-icon>
              <el-tag type="success">请上传商品图片</el-tag>
            </div>
          </el-upload></el-form-item>
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
import { reqGoodsList, reqGoodsDetail, reqGoodsUpdate, reqGoodsDown, reqGoodsUp, reqGoodsDownList, reqGoodsUpList, reqGoodsSave, reqGoodDelete } from '@/api/distributor/product/index.ts'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// 表格元对象
let goosArr = ref([])

const tableRef = ref()
const disabledButton = ref(true)

console.log(tableRef);

const dialogFormVisible = ref(false)

const form = ref({
  goodsname: '',
  goodsunit: '',
  price: 0,
  minamount: 0,
  goodsid: '',
  goodsimg: ''
})

// 表单初始化
const initForm = () => {
  form.value.goodsname = ''
  form.value.goodsunit = ''
  form.value.price = 0
  form.value.minamount = 0
  form.value.goodsid = ''
  form.value.goodsimg = ''
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

let imageUrl = ref('')

// 文件上传前
const beforeAvatarUpload = () => { }

// 文件上传成功
const handleAvatarSuccess = (res) => {
  imageUrl.value = res.data
  form.value.goodsimg = res.data
  tips("商品图片上传成功！", "商品图片上传失败", res.code)
}

watch(parm.value, (newValue, oldValue) => {

  getGoods(parm)
})

const paginationObj = ref({
  totalCount: 0,
})

onBeforeMount(async () => {
  getGoods(parm)
})

// 点击删除商品
const handedeletegoods = async (row) => {
  const arr = [row.goodsid]
  const res = await reqGoodDelete(arr)
  tips(`商品【${row.goodsname}】删除成功`, `商品【${row.goodsname}】删除失败`, res.code)
  getGoods(parm)
}

// 点击新增商品
const addGoods = async () => {
  initForm()
  dialogFormVisible.value = true
}

// 点击批量下架
const listDown = async () => {
  const selectedRowArr = tableRef.value.getSelectionRows()

  // 收集所有id
  const ids = selectedRowArr.map(item => item.goodsid)

  const res = await reqGoodsDownList(ids)
  tips("批量下架成功", "批量下架失败", res.code)
  getGoods(parm)
}

// 点击批量上架
const listUp = async () => {
  const selectedRowArr = tableRef.value.getSelectionRows()

  // 收集所有id
  const ids = selectedRowArr.map(item => item.goodsid)

  const res = await reqGoodsUpList(ids)
  tips("批量上架成功", "批量上架失败", res.code)
  getGoods(parm)
}

// 点击修改时
const handleEdit = async (row) => {
  const res = await reqGoodsDetail(row.goodsid)

  form.value.goodsname = res.goods.goodsname
  form.value.goodsunit = res.goods.goodsunit
  form.value.price = res.goods.price
  form.value.minamount = res.goods.minamount
  form.value.goodsid = res.goods.goodsid
  form.value.goodsimg = res.goods.goodsimg
  dialogFormVisible.value = true

}
// 点击删除时
const handleDelete = (row) => { }
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


// 点击下架时
const handleDown = async (row) => {
  const res = await reqGoodsDown(row.goodsid)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: row.goodsname + '下架成功'
    })
    getGoods(parm)
  } else {
    ElMessage({
      type: 'error',
      message: row.goodsname + '下架失败'
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
      getGoods(parm)
      initForm()
      dialogFormVisible.value = false
    }
  } else {
    try {
      const res = await reqGoodsSave(form.value)
      getGoods(parm)
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
  getGoods(parm)
}

// 获取商品列表
const getGoods = async (parm) => {
  const res = await reqGoodsList(parm.value)
  console.log(res);
  goosArr.value = res.page.list
  paginationObj.value.totalCount = res.page.totalCount
}

</script>

<style scoped>
.container {
  width: 100%;
  background-color: white;
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