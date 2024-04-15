<template>
  <div class="container">
    <div class="categoryImgs">

      <div class="categoryImgItem" :style="{ backgroundImage: `url(${item.url})` }" v-for="item in goodsCountArr"
        :key="item.categoryId">
        <div class="title">
          <div style="font-size: 24px;"> {{ item.categoryName }}</div>
          <div style="font-size: 18px; margin-top: 3px;">{{ item.count }}个商品</div>
        </div>
      </div>

    </div>
    <div class="content">
      <div class="title" style="font-size: 30px; font-weight: bolder;">{{ userStore.distributionCompanyName }}在售商品</div>
      <div class="goods">

        <div class="item block" v-for="item in ShoppingCartStore.goodsArr" :key="item.goodsid">
          <el-tag type="success" style="margin-bottom: 20px;font-size:20px">销售中</el-tag>
          <el-image :src="item.goodsimg" style="">
            <template #error>
              <div class="image-slot">
                <el-tag size="large" type="success" style="font-size:18px">商家未上传图片</el-tag>
              </div>
            </template>
          </el-image>
          <hr style="margin-top: 40px;width: 90%;">
          <el-badge :show-zero="false" :value="item.number" class="badge">
            <p style="margin: 10px;font-size: 18px;">{{ item.goodsname }}</p>
          </el-badge>

          <p style="color: rgb(17, 151, 68);font-weight: bolder;font-size: 16px;">￥{{ item.price }}/{{ item.goodsunit }}
          </p>
          <el-button v-if="!item.number" @click="addCart(item)" class="goodsBtn">
            <el-icon>
              <ShoppingCartFull />
            </el-icon>
            <p style="font-size: 16px;margin-left: 10px;font-weight: bold;">购买</p>

          </el-button>
          <el-input-number :min="0" v-else class="inputNumber" v-model="item.number" :max="10000"
            @change="handleChange(item)" />
        </div>

      </div>
    </div>
    <el-pagination background layout="total, prev, pager, next,sizes , jumper , " :default-current-page="1"
      :default-page-size="10" :total="ShoppingCartStore.params.total" v-model:current-page="ShoppingCartStore.params.page"
      v-model:page-size="ShoppingCartStore.params.limit" :page-sizes="[5, 10, 20, 30]" :hide-on-single-page="false"
      style="background-color: white;margin-top: 10px; display: flex; justify-content: center;" />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineComponent, onBeforeMount, watch } from "vue";
import { reqDistributionList } from '@/api/purchaser/index/index.ts'
import { reqGoodsCount, reqGoodsList } from '@/api/purchaser/goods/index.ts'
import { reqSaveShoppingCart } from '@/api/purchaser/shoppingCart/index.ts'
import { useUserStore } from '@/stores/modules/user.ts'
import { useShoppingCartStore } from '@/stores/modules/shoppingCart.ts'

const params = ref({
  page: 1,
  limit: 10,
  status: '',
  key: '',
  total: 0
})
const ShoppingCartStore = useShoppingCartStore()

watch(ShoppingCartStore.params, () => {
  getGoodsList()
})

const userStore = useUserStore()


const distrbutionObj = ref({})

const goodsCountArr = ref({})
const goodsList = ref({})

onBeforeMount(() => {
  getOrderCount()
})

// 当商品购物车数量发生变化时
const handleChange = (item) => {
  if (!item.number) {
    let index = 0
    let count = 0
    ShoppingCartStore.goodsList.forEach(goods => {

      if (goods.goodsid === item.goodsid) {
        index = count
      }
      count++
    })
    ShoppingCartStore.goodsList.splice(index, 1)

  }
  const obj = {
    distributionId: userStore.distributionId,
    amount: item.number,
    goodsId: item.goodsid,
  }
  reqSaveShoppingCart(obj)

}

// 点击添加购物车
const addCart = (item) => {
  item.number = 1
  const obj = {
    distributionId: userStore.distributionId,
    amount: item.number,
    goodsId: item.goodsid,
  }
  ShoppingCartStore.goodsList.push(item)

  reqSaveShoppingCart(obj)
}

// 获取各类订单的状态
const getOrderCount = async () => {
  if (userStore.distributionId) {
    const res = await reqGoodsCount(userStore.distributionId)
    goodsCountArr.value = res.data
  }
}

// 获取所有商品列表
const getGoodsList = async () => {
  if (userStore.distributionId) {
    const res = await reqGoodsList(userStore.distributionId, ShoppingCartStore.params)
    const goodsList = res.data.list
    if (goodsList) {
      ShoppingCartStore.goodsArr.length = 0
      goodsList.forEach(goods => {
        ShoppingCartStore.goodsArr.push(goods)
      })
    }
    // goodsList.value = res.data.list
    ShoppingCartStore.params.total = res.data.totalCount
  }

}


</script>


<style scoped>
>>>.el-input-number__decrease:hover {}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: rgba(17, 151, 68) !important;
}


.goodsBtn {
  width: 100%;
  font-size: 25px;
  background-color: rgb(245, 245, 245);
  transition: 0.5s;
  color: black;
}

p {
  margin: 0;
}

.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.goods .item {
  background: white;
  width: 245px;
  height: 352px;
  margin: 10px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  transition: 0.5s all;
  cursor: pointer;
  border: 2px solid white;
}

.goods .item:hover {
  border: 2px solid rgba(17, 151, 68, 0.9);
}

.goods .item:hover .goodsBtn {
  background-color: rgba(17, 151, 68, 0.9);
  color: white;
}

.content {
  margin-top: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 80px;
  background-color: rgb(245, 245, 245);
  box-sizing: border-box;
}

.categoryImgs {
  margin-top: 30px;
  display: flex;
}

.categoryImgs>div {
  cursor: pointer;
  width: 240px;
  height: 115px;
  border-radius: 10px;
  background-image: url("@/assets/imgaes/01.jpg");
  color: white;
  position: relative;
  margin-left: 20px;
  /* 让文字绝对定位相对于父元素 */

}

.categoryImgs>div:hover::before {
  background-color: rgba(17, 151, 68, 0.9);
}

.categoryImgs>div:before {
  transition: 0.5s;
  content: '';
  /* 伪元素用于创建灰色遮罩 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  /* 半透明黑色遮罩 */
  border-radius: 10px;
  /* 与父元素相同的圆角 */
}

.categoryImgs .title {
  position: absolute;
  top: 50%;
  /* 让文字垂直居中 */
  left: 50%;
  /* 让文字水平居中 */
  transform: translate(-50%, -50%);
  /* 居中偏移 */
  text-align: center;
  /* 文字居中 */
  z-index: 1;
  /* 让文字位于遮罩之上 */
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}


.demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.el-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 500px;
  width: 100%;
  height: 600px;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}

.image-slot .el-icon {
  font-size: 30px;
}
</style>