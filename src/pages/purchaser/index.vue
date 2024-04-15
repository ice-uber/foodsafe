<template>
  <div class="container">
    <header class="header">
      <p>您好！{{ userStore.username }}欢迎使用学膳通</p>
      <div class="right">
        <p>需要帮助</p>
        <p>联系我们</p>
      </div>
    </header>
    <div class="search">
      <div class="top">
        <div style="display: flex;align-items: center;">
          <img src="@/assets/imgaes/favicon.png" alt="logo" style="width: 60px;">
          <p style="font-size: 20px;color: rgb(17, 151, 68);font-weight: bolder;margin-left: 10px;">学膳通</p>
        </div>
        <p style="font-size: 16px;margin-left: 20px;" v-if="distributionList.length">当前配送商:
          <el-tag type="success" style="font-size:16px" size="large">{{ userStore.distributionCompanyName }}</el-tag>
        </p>
        <el-dropdown style="margin-left: 10px;">
          <span class="el-dropdown-link">
            切换配送商
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in distributionList" :key="item.distributionid">{{ item.companyname
              }}</el-dropdown-item>

            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-input placeholder="搜点什么..." class="searchInput"></el-input>
        <div class="userInfo">
          <el-avatar size="large" :src="userStore.avatar" />
          <el-dropdown style="margin-left: 10px;">
            <span class="el-dropdown-link">
              {{ userStore.username }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>用户中心</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button
            style="border-radius: 50%; width: 40px;height:40px;border: 0;background-color: rgb(228, 228, 228);margin-left: 10px;">
            <el-icon size="22">
              <Refresh />
            </el-icon>
          </el-button>
          <el-badge :value="shoppingCartStore.goodsList.length" :max="100" class="item">
            <el-button @click="visible = true"
              style="border-radius: 50%; width: 40px;height:40px;border: 0;background-color: rgb(228, 228, 228); margin-left: 10px;">
              <el-icon size="22">
                <ShoppingCart />
              </el-icon>
            </el-button>
          </el-badge>

        </div>
      </div>
      <hr>
      <div class="bottom">
        <el-menu router :default-active="`/purchaser/shopping`" class="menu" mode="horizontal" @select="handleSelect">
          <div style="display: flex;">
            <el-menu-item index="/purchaser/shopping" style="  background-color: white;">首页</el-menu-item>
            <el-menu-item index="/purchaser/distribution">我的配送商</el-menu-item>
            <el-menu-item index="/purchaser/order">订单管理</el-menu-item>
          </div>
          <div class="devMessage">
            <div>
              <el-icon class="icon">
                <Iphone />
              </el-icon>
              <div>
                <p>支持热线</p>
                <p>15065606797</p>
              </div>
            </div>
            <div>
              <el-icon class="icon">
                <Message />
              </el-icon>
              <div>
                <p>Email</p>
                <p>1472939313@QQ.com</p>
              </div>
            </div>
          </div>
        </el-menu>
      </div>
    </div>
    <div>
      <router-view v-slot="{ Component }">
        <transition mode="out-in" enter-active-class="animate__animated animate__fadeIn">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <div class="footer">
      <p style="color: white; font-size: 18px;">©2024学膳通 没有版权，不会追究=.=</p>
    </div>

    <el-drawer v-model="visible" :show-close="false">
      <template #header="{ close, titleId, titleClass }">
        <div class="shoppingCart">
          <el-icon style="font-size:30px;margin-right:10px">
            <ShoppingCartFull />
          </el-icon>
          <p>共{{ shoppingCartStore.goodsList.length }}种商品</p>
        </div>
        <div>

          <el-popconfirm title="清空购物车?" @confirm="clearShoppingCart">
            <template #reference>
              <button style="border:0;background-color:white;">
                <el-icon style="font-size:30px;cursor: pointer;">
                  <Delete />
                </el-icon>
              </button>
            </template>
          </el-popconfirm>

        </div>
      </template>
      <div class="shopping-cart-content">
        <div class="item" v-for="item in shoppingCartStore.goodsList" :key="item.goodsid">
          <el-image style="width: 150px;" :src="item.goodsimg">
            <template #error>
              <div class="image-slot">
                <el-tag size="large" type="success" style="font-size:18px">商家未上传图片</el-tag>
              </div>
            </template>
          </el-image>
          <div class="item-content">
            <p style="font-size:20px"> {{ item.goodsname }}</p>
            <p style="margin-top:10px;margin-bottom:15px;">单价({{ item.goodsunit }}) - ￥{{ item.price }}</p>
            <el-input-number :min="0" class="inputNumber" v-model="item.number" :max="10000"
              @change="handleChange(item)" />
          </div>
          <p style="color: rgb(17, 151, 68);font-size:25px;font-weight:bolder">
            ￥{{ (item.price * item.number).toFixed(2) }}
          </p>
        </div>

      </div>

      <template #footer="{ close, titleId, titleClass }">
        <div class="shoppingCart-foot">
          <el-button @click="handeCheckOut"
            style="width:400px;background-color:rgb(17, 151, 68);height:50px;border-radius:5px">
            <p>去结账</p>
            <p style="margin-left:20px;padding-left:10px;border-left:1px solid white;">￥{{ banlance }}</p>
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onBeforeMount, ref, watch } from 'vue';
import { reqDistributionList } from '@/api/purchaser/index/index.ts'
import { useUserStore } from '@/stores/modules/user.ts'
import { useShoppingCartStore } from '@/stores/modules/shoppingCart.ts'
import { reqSaveShoppingCart, reqShoppingCartList, reqRemoveShoppingCartList } from '@/api/purchaser/shoppingCart/index.ts'
import { reqGoodsCount, reqGoodsList } from '@/api/purchaser/goods/index.ts'

const router = useRouter()
const userStore = useUserStore()
const shoppingCartStore = useShoppingCartStore()

const visible = ref(false)

const distributionList = ref([])

const banlance = ref(0)

// 监视购物车有无变化
watch(shoppingCartStore.goodsList, () => {
  const list = shoppingCartStore.goodsList
  let count = 0;
  list.forEach(item => {
    count += item.number * item.price
  })
  banlance.value = count.toFixed(2)
}, {
  immediate: true
})



onBeforeMount(async () => {

  await getGoodsList()
  getDistributionList()
  getShoppingCart()
  router.push("/purchaser/shopping")
})

// 结账
const handeCheckOut = () => {
  visible.value = false
  router.push("/purchaser/checkout")
}

// 清空购物车
const clearShoppingCart = () => {
  shoppingCartStore.goodsList.length = 0
  visible.value = false
  reqRemoveShoppingCartList(userStore.distributionId)
  getGoodsList()
}

// 当商品购物车数量发生变化时
const handleChange = (item) => {
  if (!item.number) {
    let index = 0
    let count = 0
    shoppingCartStore.goodsList.forEach(goods => {

      if (goods.goodsid === item.goodsid) {
        index = count
      }
      count++
    })
    shoppingCartStore.goodsList.splice(index, 1)

  }
  const obj = {
    distributionId: userStore.distributionId,
    amount: item.number,
    goodsId: item.goodsid,
  }
  reqSaveShoppingCart(obj)
}

// 获取当前配送商下的购物车列表
const getShoppingCart = async () => {
  const res = await reqShoppingCartList(userStore.distributionId);
  if (res.code === 200) {
    const arr = res.data
    if (arr) {
      arr.forEach(item => {
        console.log(item, shoppingCartStore.goodsArr);

        const goods = shoppingCartStore.goodsArr.filter(goods => {

          return goods.goodsid === item.goodsid
        })

        console.log(goods);

        shoppingCartStore.goodsList.push(goods[0])
      })
    }


  }
}

// 登出
const logout = async () => {
  await userStore.logout()
  router.push("/login")
}

// 获取全部合作的配送商
const getDistributionList = async () => {
  const res = await reqDistributionList()
  distributionList.value = res.data
}

// 获取所有商品列表
const getGoodsList = async () => {
  if (userStore.distributionId) {
    const res = await reqGoodsList(userStore.distributionId, shoppingCartStore.params)
    const goodsList = res.data.list
    if (goodsList) {
      shoppingCartStore.goodsArr.length = 0
      goodsList.forEach(goods => {
        shoppingCartStore.goodsArr.push(goods)
      })
    }
    // goodsList.value = res.data.list
    shoppingCartStore.params.total = res.data.totalCount
  }

}

</script>

<style scoped>
.footer {
  width: 100%;
  height: 100px;
  margin-top: 40px;
  background-color: rgb(17, 151, 68);
  display: flex;
  justify-content: center;
  align-items: center;
}

.shopping-cart-content .item-content {
  color: rgb(40, 39, 39);
  /* margin-left: 30px; */
}

.shopping-cart-content .item {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  box-sizing: border-box;
  height: 200px;
}

.shopping-cart-content {
  /* background-color: aqua; */
  width: 100%;
  height: 100%;
}

.shoppingCart-foot p {
  color: white;
  font-size: 18px;
}

.shoppingCart {
  display: flex;
  justify-content: center;
  font-size: 18px;
  color: rgb(17, 151, 68);
}

.menu {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;

}

.devMessage .icon {
  font-size: 30px;
  color: rgb(17, 151, 68);
  font-weight: bolder;
  margin-right: 8px;
}

.devMessage>div {
  display: flex;
  align-items: center;
  margin: 10px;
}


.devMessage {
  display: flex;
}

.userInfo {
  margin-left: 120px;
  display: flex;
  align-items: center;
}

.searchInput {
  width: 600px;
  border-radius: 10px;
  height: 40px;
  margin-left: 30px;
}

.search .top {
  background-color: white;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 14px;

}

.search .bottom {
  background-color: white;
  padding: 0 30px;
}

.search {
  background-color: white;
  box-sizing: border-box;
  /* padding: 0 20px; */
  height: 150px;
  /* background-color: aqua; */
}

.header .right {
  display: flex;
  width: 200px;
  justify-content: space-evenly;
}

.header .right p {
  cursor: pointer;
}

.header .right p:hover {
  color: red;
}


.container {
  width: 100%;
  height: 100%;
  background-color: rgb(245, 245, 245);
  /* background-color: aquamarine; */
}

p {
  margin: 0;
}

.header {
  height: 45px;
  background-color: rgb(17, 151, 68);
  margin: 0;
  color: white;
  padding: 0;
  font-size: 16px;
  display: flex;
  padding: 0 50px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
}

>>>.el-input__wrapper {
  background-color: rgb(245, 245, 245);
}
</style>