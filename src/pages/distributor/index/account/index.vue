<template>
  <div class="container">
    <el-button type="success">新增</el-button>
    <el-table @selection-change="onSelected" :stripe="true" :highlight-current-row="true" max-height="400px"
      ref="tableRef" :data="userArr" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column label="用户头像" width="120">
        <template #default="scope">
          <el-avatar :src="scope.row.avatar" />

        </template>
      </el-table-column>
      <el-table-column property="userRole" label="角色" width="120" />
      <el-table-column property="userRealname" label="联系人" show-overflow-tooltip />
      <el-table-column property="userTel" label="联系电话" show-overflow-tooltip />
      <el-table-column property="status" label="是否启用" show-overflow-tooltip>
        <template #default="scope">
          <el-tag size="small" @click="handleEdit(scope.row)" v-if="scope.row.status == 0" type="warning">未启用</el-tag>
          <el-tag size="small" @click="handleEdit(scope.row)" v-else type="success">启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :hide-on-single-page="true" background layout="total, prev, pager, next,sizes , jumper , "
      :default-current-page="1" :default-page-size="5" :total="paginationObj.totalCount" v-model:current-page="parm.page"
      v-model:page-size="parm.limit" :page-sizes="[5, 10, 20, 30]"
      style="background-color: white;margin-top: 10px; display: flex; justify-content: center;" />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onBeforeMount, ref } from "vue";
import { reqChildrenList } from '@/api/distributor/account/index.ts'

const paginationObj = ref({
  totalCount: 0,
})


const parm = ref({
  page: 1,
  limit: 5
})

// {
//   userName: '',
//   userRole: '',
//   userRealname: '',
//   userTel: '',
//   avatar: '',
//   status: ''

// }
const userArr = ref([])

onBeforeMount(() => {
  getChildrenUsers(parm.value)
})

const handleEdit = (row) => { }
const handleUp = (row) => { }
const handleDown = (row) => { }
const handleDelete = (row) => { }
const onSelected = () => { }


// 获取子账户列表函数
const getChildrenUsers = async (parm) => {
  const res = await reqChildrenList(parm)
  userArr.value = res.page.list
  paginationObj.value.totalCount = res.page.totalCount
}

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>