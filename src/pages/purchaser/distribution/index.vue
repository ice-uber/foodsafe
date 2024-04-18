<template>
  <div class="container">

    <Hearder title="我的配送商" sencondTitle="My Disbutions"></Hearder>
    <div class="content">

      <!-- <div class="header">
        <el-steps class="step" :space="200" :active="params.status" finish-status="success" @change="onStepChange">
          <el-step title="未受理" @click="setp = 0" icon="DocumentDelete">
            <template #title>
              <el-badge :value="distributionArr.length" class="item">
                <p>未受理</p>
              </el-badge>
            </template>
          </el-step>

          <el-step @click="setp = 1" title="待发货" icon="Box"> <template #title>
              <el-badge :value="distributionArr.length" class="item">
                <p>待发货</p>
              </el-badge>
            </template>
          </el-step>
        </el-steps>
      </div> -->

      <div class="distribution" v-for="(item, index) in distributionArr" :key="item.distributionid">
        <div class="title mytitle">
          <p>配送商详情 #{{ index + 1 }}</p>
          <p style="font-size:25px;font-weight:1500;margin-left:20px;color:black;">{{ item.companyname }}</p>
        </div>
        <div class="message">
          <div class="pic">
            <el-image :preview-src-list="item.imgList" :src="item.shopImg" style="width: 100%;"></el-image>
            <div style="color:rgb(17, 151, 68);display:flex;align-items:center;margin-top:10px"
              v-if="item.imgList.length">
              <el-icon>
                <View />
              </el-icon>
              <p>点击图片查看详情</p>
            </div>
          </div>
          <div class="base">
            <div class="attrName">
              <el-icon>
                <InfoFilled />
              </el-icon>
              <p style="margin-left: 10px;">基础信息</p>
            </div>
            <div class="detail">
              <div>
                <p>配送商名称</p>
                <p>{{ item.companyname }}</p>
              </div>
              <div>
                <p>责任人</p>
                <p>{{ item.name }}</p>
              </div>
              <div>
                <p>联系方式</p>
                <p>{{ item.phone }}</p>
              </div>
              <div>
                <p>商家地址</p>
                <p>{{ item.addr }}</p>
              </div>
              <div>
                <p>资质证明</p>
                <el-tag type="success" v-if="item.hasAuthentication === '1'">已完成认证</el-tag>
                <el-tag type="success" v-else>已完成认证</el-tag>
              </div>
            </div>

          </div>
          <div class="count">
            <div class="attrName">
              <el-icon>
                <Checked />
              </el-icon>
              <p style="margin-left: 10px;">商品种类</p>
            </div>

            <div class="detail">
              <div v-for="goods in item.goodsCount" :key="goods.categoryId">
                <p>{{ goods.categoryName }}
                  <svg aria-hidden="true" class="svg-icon">
                    <use :xlink:href="`#icon-${goods.categoryId}`" />
                  </svg>
                </p>
                <p>{{ goods.count }} 项</p>
              </div>

            </div>
          </div>

        </div>

        <div class="sum">
          <div>
            <div class="sumTitle">
              <el-icon>
                <Calendar />
              </el-icon>
              <p style="margin-left: 10px;">来往记录</p>
            </div>
            <div class="sumDetail">
              <div>
                <p>合作期限</p>
                <el-tag style="font-size:16px;font-weight:bolder;" type="success"
                  v-if="item.cooperation.islongrelation === '1'">长期</el-tag>
                <el-tag style="font-size:16px;font-weight:bolder;" type="success" v-else>{{
                  `${item.cooperation.begindate}-${item.cooperation.enddate}` }}</el-tag>
              </div>
              <div>
                <p>累计完成订单数</p>
                <p>{{ item.sumFinishOrder }}单</p>
              </div>
              <div style="color: rgb(17, 151, 68);font-weight: bolder;font-size: 20px;">
                <p>累计交易金额</p>
                <p>￥{{ item.sumMoney }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <el-pagination background layout="total, prev, pager, next,sizes , jumper , " :default-current-page="1"
        :default-page-size="10" :total="params.total" v-model:current-page="params.page" v-model:page-size="params.limit"
        :page-sizes="[5, 10, 20, 30]" :hide-on-single-page="false"
        style="background-color: white;margin-top: 30px; display: flex; justify-content: center;" />
    </div>



  </div>
</template>

<script setup>
import Hearder from '@/components/purchaser/header/Hearder.vue'
import { reqDistributionList } from '@/api/purchaser/distribution/index.ts'
import { onBeforeMount, ref, onUpdated } from 'vue'
import pubsub from 'pubsub-js'

const params = ref({
  page: 1,
  limit: 5,
  key: '',
  status: '',
  total: 0
})

const distributionArr = ref([])

onBeforeMount(() => {
  pubsub.publish('load')
  getDistributions()
})

onUpdated(() => {
  pubsub.publish('unload')
})


// 获取配送商列表
const getDistributions = async () => {
  const res = await reqDistributionList(params.value)
  distributionArr.value = res.data.list
  params.value.total = res.data.totalCount
}

</script>

<style scoped>
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: rgba(245, 245, 245) !important;
}

.sumTitle {
  display: flex;
  justify-content: center;
  color: rgb(17, 151, 68);
  font-size: 25px;
  align-items: center;
}

.sumDetail>div:first-child {
  border-top: 2px solid rgb(17, 151, 68);
}

.sumDetail>div {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid rgb(245, 245, 245);
  margin: 5px 0;
  padding: 10px 20px;
}

.sum>div {
  width: 40%;
  font-size: 16px;
}

.sum {
  display: flex;
  justify-content: center;
  width: 100%;
}

.pic {
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.svg-icon {
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  margin-left: 10px;
  border: 0;
}

.base .detail>div {
  margin: 6px 0;
}

.message {
  display: flex;
  justify-content: space-evenly;
  font-size: 16px;
}


.attrName {
  display: flex;
  color: rgb(17, 151, 68);
  font-size: 20px;
  align-items: center;
  margin-bottom: 10px;
}

.detail>div p {
  display: flex;
  align-items: center;
}

.detail>div {
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
}

.detail {
  padding: 0 20px;
  background-color: rgb(245, 245, 245);
  width: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  justify-content: center;
  height: 200px;
  box-sizing: border-box;
}

.title {
  color: rgb(17, 151, 68);
  font-size: 30px;
  font-weight: bolder;
  display: flex;
  align-items: center;
}

.content {
  width: 100%;
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
}

.container {
  min-height: 62vh;
  padding: 40px 100px;
  box-sizing: border-box;
}
</style>