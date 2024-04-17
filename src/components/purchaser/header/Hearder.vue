<template>
  <div class="header">
    <p style="font-size: 34px;font-weight: bolder;" v-if="props.title">{{ props.title }}</p>
    <p style="font-size: 20px;" v-if="props.sencondTitle">{{ props.sencondTitle }}</p>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
const props = defineProps(['title', 'sencondTitle'])

</script>

<style scoped>
.header {
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
</style>