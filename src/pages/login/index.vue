<template>
  <div class="container">
    <!-- <div class="title">
      <img style="width: 200px;" src="../../assets/imgaes/logo.png" alt="">
      <p>学膳通</p>
    </div> -->
    <div class="login-box">

      <div class="login-inner-box">
        <p class="title">欢迎使用学膳通！</p>
        <p style="font-size: 16px;">校园食品一站式管理平台</p>
        <el-form ref="loginForms" class="login_form_content" :model="loginForm" :rules="loginFormRule">
          <el-form-item prop="userName">
            <el-input class="input" :prefix-icon="User" v-model.trim="loginForm.userName" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input class="input" type="password" :prefix-icon="Lock" show-userPassword
              v-model.trim="loginForm.userPassword" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="login-btn">
            <el-button type="primary" size="default" class="login_btn" @click="login" :loading="isLoding"
              style="width: 100%;height: 40px; background-color: rgb(17, 151, 68);">登录
            </el-button>
          </el-form-item>
          <el-form-item>
            <p style="margin-left: 150px;">忘记密码？<a style="color:rgb(17, 151, 68)">在这里重置</a></p>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script lang="js" setup>
import { defineComponent, ref, reactive } from "vue";
import { User, Lock } from '@element-plus/icons-vue'
import { reqLogin } from '@/api/user'
import { ElNotification } from 'element-plus'
import { useUserStore } from "@/stores/modules/user.ts";
import { getTime } from '@/utils/time'
import { useRouter, useRoute } from "vue-router";

const router = useRouter()
const route = useRoute()


const loginForms = ref()
let isLoding = ref(false)
const loginForm = reactive({ userName: 'admin', userPassword: '123456' })
const UserStore = useUserStore();

// 登录表单规则
let loginFormRule = {
  userName: [
    {
      required: true,
      min: 5,
      max: 12,
      message: '账号的长度为5-12位',
      trigger: 'change',
    },
  ],
  userPassword: [
    {
      required: true,
      min: 6,
      max: 12,
      message: '密码的长度为6-12位',
      trigger: 'change',
    },
  ],
}
// 登录方法
async function login() {

  // 任意表单不符合规范则不触发
  await loginForms.value.validate()

  isLoding.value = true
  try {
    await UserStore.login(loginForm)
    const redirect = route.query.redirect
    router.push(redirect || '/')
  } catch (e) {
    ElNotification({
      type: 'error',
      message: e.message,
    })
  } finally {
    isLoding.value = false
  }
}

</script>

<style scoped>
.input {
  background-color: rgb(245, 245, 245);
}

p {
  margin: 0;
}

/* @import '../assets/css/Login.css' */
.login-btn {
  display: flex;
  justify-content: center;
}

.container {
  background-color: rgb(245, 245, 245);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: center;

}

.title {
  margin-top: 100px;
  color: rgb(17, 151, 68);
  font-size: 30px;
  font-weight: bolder;
  margin-bottom: 10px;
}

.login-box {
  width: 600px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  filter: none;
  z-index: 2;
  justify-content: center;

}


.login-inner-box {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: 150px;
}

.vagImg {
  width: 60%;
  height: 100%;
}

.login_form_content {
  margin-top: 30px;
  width: 100%;
}

.login-form {

  width: 80%;
  height: 70%;

}

>>>.el-input__inner {

  border-bottom: 1px solid rgb(245, 245, 245);
  background-color: rgb(245, 245, 245);
  padding: 20px 0px;
}


>>>.el-input__wrapper {
  background-color: rgb(245, 245, 245);
}

.userName>>>.el-input__inner {
  background-image: url("@/assets/icon/userName.png");
  background-size: 20px;
  background-repeat: no-repeat;
  background-position-y: 1px;
  background-position-x: 3px;
  background-color: rgb(245, 245, 245);
}

.userPassword>>>.el-input__inner {
  background-color: rgb(245, 245, 245);
  background-size: 20px;
  background-repeat: no-repeat;
  background-position-y: 1px;
  background-position-x: 3px;
}
</style>