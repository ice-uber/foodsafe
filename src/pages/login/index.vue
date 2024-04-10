<template>
  <div class="container">

    <div class="login-box">
      <img src="@/assets/imgaes/login-2.jpg" alt="蔬菜" class="vagImg">
      <div class="login-inner-box">

        <el-form ref="loginForms" class="login_form_content" :model="loginForm" :rules="loginFormRule">
          <el-form-item prop="userName">
            <el-input :prefix-icon="User" v-model.trim="loginForm.userName" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input type="userPassword" :prefix-icon="Lock" show-userPassword v-model.trim="loginForm.userPassword"
              placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="default" class="login_btn" @click="login" :loading="isLoding">
              登录
            </el-button>
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
import router from '@/router'

const loginForms = ref()
let isLoding = ref(false)
const loginForm = reactive({ userName: 'admin', userPassword: 'atguigu123' })
const UserStore = useUserStore();
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

async function login() {

  // 任意表单不符合规范则不触发
  await loginForms.value.validate()

  isLoding.value = true
  try {
    await UserStore.login(loginForm)
    // const redirect = route.query.redirect
    router.push('/index')
    ElNotification({
      type: 'success',
      message: '登录成功！',
      title: `Hi,${getTime()}好`,
    })
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
/* @import '../assets/css/Login.css' */


.container {

  background-color: rgb(51, 51, 51);
  background-size: contain;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);


}

.container::after {
  /* 为元素必须写一个 content，里面放个空格也行 */
  content: " ";
  display: block;

  /* 这里借助绝对定位，拉扯这个元素，实现变相设置元素大小 */
  position: absolute;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  background: inherit;
  /* 设置模糊，不用 filter */
  /* backdrop-filter: blur(5px); */
  filter: blur(5px);
  /* background-color: rgba(128, 255, 0, 0.404); */

  /* 需要设置 ::after 的叠放层级，否则它将在 local-blur 的下方 */
  z-index: 1;

  border: 1px solid black;
  box-shadow: 0px 0px 3px darkgray;
}

.login-box {
  width: 1000px;
  height: 500px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  filter: none;
  z-index: 2;
}

.login-inner-box {
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vagImg {
  width: 60%;
  height: 100%;
}

.login-form {
  width: 60%;
  height: 70%;

}

/* >>>.el-input__inner {
  border: 0px;
  border-bottom: 1px solid rgb(183, 181, 181);
  margin: 20px 0;
  font-size: 16px;
  padding-left: 30px;
  height: 30px;
}

.userName>>>.el-input__inner {
  background-image: url("@/assets/icon/userName.png");
  background-size: 20px;
  background-repeat: no-repeat;
  background-position-y: 1px;
  background-position-x: 3px;
}

.userPassword>>>.el-input__inner {
  background-image: url("@/assets/icon/userPassword.png");
  background-size: 20px;
  background-repeat: no-repeat;
  background-position-y: 1px;
  background-position-x: 3px;
} */
</style>