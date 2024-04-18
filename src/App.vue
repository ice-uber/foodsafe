
<template>
  <div class="container">
    <div v-if="isLoad" class="loadContainer">
      <div class="loader"></div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import pubsub from 'pubsub-js'


const isLoad = ref(false)
onBeforeMount(() => {
  isLoad.value = true
})

const load = () => {
  isLoad.value = true
}

const unload = () => {
  isLoad.value = false
}

onMounted(() => {
  isLoad.value = false
})


pubsub.subscribe('load', load)
pubsub.subscribe('unload', unload)

</script>


<style scoped>
/* HTML: <div class="loader"></div> */
.container {
  width: 100%;
  height: 100%;
}
</style>
