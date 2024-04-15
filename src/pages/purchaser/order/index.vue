<template>
  <div class="container">
    <div class="header">
      <p style="font-size: 34px;font-weight: bolder;">我的订单</p>
      <p style="font-size: 20px;">My orders</p>
    </div>
    <div class="content"></div>
  </div>
</template>

<script setup>

</script>

<style scoped>
p {
  margin: 0;
}

.container .content {
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0;
}

.container .header {
  width: 100%;
  height: 100px;
  background-color: white;
  margin-bottom: 30px;
  border-top: 5px solid rgb(17, 151, 68);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(17, 151, 68);
  cursor: pointer;
}

.container {
  padding: 40px 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
</style>