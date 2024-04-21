<template>
  <div class="container">
    <el-card>
      <el-form class="from">
        <el-form-item>
          <el-input v-model="params.key" placeholder="检索信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="params.purchaserId" placeholder="选择单位/机关/学校" style="width: 240px">
            <el-option :label="item.companyname" :value="item.purchaserid" v-for="item in purchaserArr"
              :key="item.purchaserid" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="params.date" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handeSearch">检索</el-button>
          <el-button type="success" @click="handeAllSearch">全部检索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="orderArr" style="width: 100%" :stripe="true" :border="true">
        <el-table-column type="expand">
          <template #default="props">
            <div style="margin-left: 150px;">
              <el-table :data="props.row.children">
                <el-table-column label="商品名称" prop="goodsName" />
                <el-table-column label="单价" prop="price" />
                <el-table-column :label="`下单量`" prop="amount">
                  <template #default="scope">
                    <p>{{ scope.row.amount }} ({{ scope.row.goodsunit }})</p>
                  </template>
                </el-table-column>
                <el-table-column label="来源填报" prop="price">
                  <template #default="scope">
                    <el-tag size="small" v-if="scope.row.supplierid" type="success">已填报</el-tag>
                    <el-tag size="small" v-else type="warning">未填报</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="食材检测">
                  <template #default>
                    <el-tag type="success">合格</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template #default="scope">
                    <el-tooltip class="box-item" effect="dark" content="查看商品信息" placement="top-start">
                      <el-button type="success" size="small" @click="handegoodsDetail(scope.row)">
                        <el-icon>
                          <View />
                        </el-icon>
                      </el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>

        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="orderno" label="订单号" width="290" align="center" />
        <el-table-column prop="addtime" label="下单时间" width="180" align="center" />
        <el-table-column prop="purchaserName" label="采购单位" align="center" />
        <el-table-column prop="distributionCompanyName" label="配送单位" width="180" align="center" />
        <el-table-column prop="address" label="配送商地址" align="center" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-tooltip class="box-item" effect="dark" content="查看订单信息" placement="top-start">
              <el-button type="success" size="small" @click="handeDrawer(scope.row)">
                <el-icon>
                  <View />
                </el-icon>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total, prev, pager, next,sizes , jumper , " :default-current-page="1"
        :default-page-size="10" :total="params.total" v-model:current-page="params.page" v-model:page-size="params.limit"
        :page-sizes="[5, 10, 20, 30]" :hide-on-single-page="false" @change="pageChange"
        style="background-color: white;margin-top: 30px; display: flex; justify-content: center;" />
    </el-card>

    <el-drawer v-model="drawer" :with-header="true">
      <div class="order-detail">
        <div class="detail">
          <div class="title mytitle">
            <p>订单信息</p>
          </div>
          <div class="container">
            <div class="content">
              <p>下单时间:{{ order.addtime }}</p>
              <p>签收时间:{{ order.signtime }}</p>
              <p>订单金额:￥{{ order.money }}</p>
            </div>
          </div>

        </div>
        <div class="purchaser">
          <div class="title mytitle">
            <p>采购商信息</p>
          </div>
          <div class="container">
            <div class="content">
              <p>采购单位:{{ order.purchaserName }}</p>
              <p>采购人:{{ order.addrName }}</p>
              <p>联系方式:{{ order.addrPhone }}</p>
              <p>地址:{{ order.address }}</p>
            </div>
            <div class="pz">
              <el-image :src="order.purchaserPzUrl[0]" :preview-src-list="order.purchaserPzUrl"
                style="width: 100px;"></el-image>
            </div>
          </div>

        </div>
        <div class="purchaser">
          <div class="title mytitle">
            <p>配送商信息</p>
          </div>
          <div class="container">
            <div class="content">
              <p>配送单位:{{ order.distributionCompanyName }}</p>
              <p>法人:{{ order.distributionPerson }}</p>
              <p>联系方式:{{ order.distributionTel }}</p>
              <p>商家地址:{{ order.distributionAddr }}</p>
            </div>
            <div class="pz">
              <el-image :src="order.distributionPzUrl[0]" :preview-src-list="order.distributionPzUrl"
                style="width: 100px;"></el-image>
            </div>
          </div>

        </div>
        <div class="goods">
          <div class="title mytitle">
            <p>订单商品</p>

          </div>
          <div class="goods-list">
            <div class="goods-detail" v-for="item in order.children" :key="item.orderdetailid"
              @click="handegoodsDetail(item)">
              <el-image style="width: 150px;" :src="item.imgurl"></el-image>
              <p>{{ item.goodsName }}</p>
              <p>来源：<el-tag v-if="item.supplierEntity.type === '1'" type="success">专业合作社</el-tag>
                <el-tag v-else type="success">种植基地</el-tag>
              </p>
              <p>质量检测：合格</p>
            </div>
          </div>
        </div>
      </div>
      <template #header>
        <div>
          <p style="font-size: 16px;color: black;">订单号: {{ order.orderno }}</p>
        </div>
      </template>

    </el-drawer>

    <el-dialog v-model="dialogGoodsVisible" title="溯源详情" width="500" class="goods-source">
      <div style="margin-bottom: 30px;display: flex;align-items: center;flex-direction: column;justify-content: center;">
        <el-image :src="goodsDetail.goods.imgurl" style="width: 200px;margin-bottom: 10px;"></el-image>
        <el-tag type="success" style="font-size: 16px;">{{ goodsDetail.goods.goodsName }}</el-tag>
      </div>

      <el-timeline style="max-width: 600px">
        <el-timeline-item icon="List" color="rgb(17, 151, 68)" size="large" :timestamp="goodsDetail.signtime"
          placement="top">
          采购环节
          <el-card class="card">
            <p>采购单位:{{ goodsDetail.purchaserName }}</p>
            <p>采购人:{{ goodsDetail.addrName }}</p>
            <p>联系方式:{{ goodsDetail.addrPhone }}</p>
            <p>地址:{{ goodsDetail.address }}</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item icon="Box" color="rgb(17, 151, 68)" size="large" :timestamp="goodsDetail.confirmsigntime"
          placement="top">
          配送环节
          <el-card class="card">
            <p>配送单位:{{ goodsDetail.distributionCompanyName }}</p>
            <p>法人:{{ goodsDetail.distributionPerson }}</p>
            <p>联系方式:{{ goodsDetail.distributionTel }}</p>
            <p>商家地址:{{ goodsDetail.distributionAddr }}</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item icon="Pear" color="rgb(17, 151, 68)" size="large" :timestamp="goodsDetail.goods.purchaseTime"
          placement="top">
          供货环节
          <el-card class="card">
            <p>来源名称:{{ goodsDetail.goods.supplierEntity.supplierCompanyName }}</p>
            <p>来源类型:
              <el-tag v-if="goodsDetail.goods.supplierEntity.type === '1'" type="success">专业合作社</el-tag>
              <el-tag v-else type="success">种植基地</el-tag>
            </p>
            <p>所在地区:寿光市</p>
            <p>来源地址:{{ goodsDetail.goods.supplierEntity.supplieraddress }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onBeforeMount, ref } from "vue";
import { reqSupervisorList, reqPurchaserList } from '@/api/supervisor/foodSource/index.ts'

const dialogGoodsVisible = ref(false)
const drawer = ref(false)
const goodsDetail = ref({})

const params = ref({
  page: 1,
  limit: 10,
  key: '',
  date: [],
  purchaserId: '',
  startDate: '',
  endDate: '',
  total: 0
})

const paramsInit = () => {
  params.value.page = 1
  params.value.limit = 10
  params.value.key = ''
  params.value.date = []
  params.value.purchaserId = ''
  params.value.startDate = ''
  params.value.endDate = ''
}

const purchaserArr = ref([])

// 点击搜索
const handeSearch = () => {
  const date = params.value.date
  params.value.date = []
  params.value.startDate = date[0]
  params.value.endDate = date[0]
  getOrderList()
}

// 页码发生变化时
const pageChange = () => {
  getOrderList()
}

// 点击搜索全部
const handeAllSearch = () => {
  paramsInit()
  getOrderList()
}

const orderArr = ref([])

onBeforeMount(() => {
  getOrderList()
  getPurchaserList()
})

// 点击商品时
const handegoodsDetail = async (goods) => {
  goodsDetail.value = order.value;
  goodsDetail.value.goods = goods

  dialogGoodsVisible.value = true
}

const order = ref({})

// 点击查看订单详情时
const handeDrawer = (orderItem) => {
  order.value = orderItem
  drawer.value = true
}

// 获取所有采购商列表
const getPurchaserList = async () => {
  const res = await reqPurchaserList()

  purchaserArr.value = res.data
}

// 获取所有订单列表
const getOrderList = async () => {
  const res = await reqSupervisorList(params.value)

  orderArr.value = res.data.list
  params.value.total = res.data.totalCount
}


</script>

<style lang="scss" scoped>
.card p {
  margin: 10px 0;
}

.card {
  margin: 10px 2px;
  font-size: 16px;

}

.goods-source {
  font-size: 16px;
}

.goods-list {
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

}

.goods-detail p {
  margin: 2px 0;
}

.goods-detail {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
}

.title {
  font-size: 18px;
  font-weight: bolder;
}

p {
  margin: 0;
}

.order-detail .content p {
  margin: 10px 0;
}


.order-detail {
  font-size: 14px;
}

.order-detail .container {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.purchaser,
.distribution {
  display: flex;
  flex-direction: column;

}

.from {
  display: flex;
  justify-content: space-between;
}

.container {
  width: 100%;
  height: 100%;
}
</style>