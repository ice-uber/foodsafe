<template>
  <router-view v-slot="{ Component, route }">
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
    >
      <component :is="Component" v-if="isFlag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useLayoutSettings } from '@/stores/modules/LayoutrSettings'
const layoutSettings = useLayoutSettings()
let isFlag = ref(true)
watch(
  () => layoutSettings.refresh,
  () => {
    isFlag.value = false
    nextTick(() => {
      isFlag.value = true
    })
  },
)
</script>

<style scoped></style>
