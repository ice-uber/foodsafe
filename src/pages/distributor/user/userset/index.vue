<template>
  <div class="container">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" type="card">
      <el-tab-pane label="个人信息" style="font-size:16px;" name="1">
        <el-form style="margin:20px 100px" label-width="60px" :model="userForm">
          <el-form-item label="账号">
            <el-input v-model="userForm.userName" style="width: 300px;" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input style="width: 300px;" v-model="userForm.userRealname"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input style="width: 300px;" v-model="userForm.userTel"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input style="width: 300px;" v-model="userForm.userEmail"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left:100px" type="primary" @click="updateUserInfo">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="单位信息" style="font-size:16px;" name="2">
        <el-form style="margin:20px 100px" label-width="100px" :model="userForm">
          <el-form-item label="单位名称">
            <el-input v-model="userForm.companyname" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="单位地址">
            <el-input style="width: 300px;" v-model="userForm.addr"></el-input>
          </el-form-item>
          <el-row style="display: flex;width: 800px;flex-direction: row;">
            <el-col :span="12">
              <el-form-item label="营业证件">
                <el-upload class="avatar-uploader" action="/api/admin/common/upload" :show-file-list="false"
                  :on-success="handlebusinessCardImgSuccess" :before-upload="beforeAvatarUpload"
                  :headers="{ token: userStore.token }">
                  <el-image v-if="userForm.businessCardImg" :src="userForm.businessCardImg" fit="cover" style="  width: 178px;
  height: 178px;" />
                  <div v-else
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <el-icon class="avatar-uploader-icon">
                      <Plus />
                    </el-icon>
                    <el-tag type="success">请上传营业证件</el-tag>
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">

              <el-form-item label="法人身份证">
                <el-upload class="avatar-uploader" action="/api/admin/common/upload" :show-file-list="false"
                  :headers="{ token: userStore.token }" :on-success="handleidentificationCardImgSuccess"
                  :before-upload="beforeAvatarUpload">
                  <el-image v-if="userForm.identificationCardImg" :src="userForm.identificationCardImg" fit="cover" style="  width: 178px;
  height: 178px;" />
                  <div v-else
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <el-icon class="avatar-uploader-icon">
                      <Plus />
                    </el-icon>
                    <el-tag type="success">请上传法人身份证</el-tag>
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button style="margin-left:200px;margin-top: 50px;" type="primary"
              @click="saveCompanyMessage">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="修改密码" style="font-size:16px;" name="3">
        <el-form style="margin:20px 100px" label-width="60px" :model="userForm">
          <el-form-item label="账号">
            <el-input v-model="userForm.userName" style="width: 300px;" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input style="width: 300px;" v-model="userForm.userRealname"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input style="width: 300px;" v-model="userForm.userTel"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input style="width: 300px;" v-model="userForm.userEmail"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left:100px" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template> 

<script lang="ts" setup>
import { defineComponent, ref, onBeforeMount } from "vue";
import { reqUserInfoDetail, reqSaveCompanyMessage, reqUpdateUserInfo } from '@/api/distributor/user/userSet/index.ts'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useUserStore } from "@/stores/modules/user.ts";


const userStore = useUserStore()
const activeName = ref('1')

const userForm = ref({
  userId: '',
  userName: '',
  userRealname: '',
  userTel: '',
  userEmail: '',
  distributionid: '',
  companyname: '',
  addr: '',
  identificationCardImg: '',
  businessCardImg: '',
})

let imageUrl = ref('')

// 保存单位信息
const saveCompanyMessage = async () => {
  // const { distributionid , companyname , addr ,  identificationCardImg , businessCardImg} = userForm.value
  const data = userForm.value
  const res = await reqSaveCompanyMessage(data)
  tips("单位信息保存成功！", "单位信息保存失败", res.code)
}

// 保存用户信息
const updateUserInfo = async () => {
  const res = await reqUpdateUserInfo(userForm.value)
  tips("用户信息保存成功！", "用户信息保存失败", res.code)
}

// 文件上传前
const beforeAvatarUpload = () => { }

// 身份证上传成功
const handleidentificationCardImgSuccess = (res) => {
  imageUrl.value = res.data
  userForm.value.identificationCardImg = res.data
  tips("法人身份证上传成功！", "法人身份证上传失败", res.code)
}

// 营业执照上传成功
const handlebusinessCardImgSuccess = (res) => {
  imageUrl.value = res.data
  userForm.value.businessCardImg = res.data
  tips("营业执照上传成功！", "营业执照上传失败", res.code)
}

onBeforeMount(() => {
  getuserInfo()
})

const getuserInfo = async () => {
  const res = await reqUserInfoDetail()
  console.log(res);
  userForm.value = res.data
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