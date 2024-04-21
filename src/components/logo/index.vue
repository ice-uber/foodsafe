<template>
  <div class="logo_container" :class="{ fold: lauoutSettings.fold }">
    <!-- <img :src="'@/assets/imgaes/favicon.png'" alt="logo" class="logo_ico" /> -->
    <p v-if="!lauoutSettings.fold">{{ logo.title }}</p>
  </div>
</template>

<script setup lang="ts">
import { logo } from '@/settings'
import { useLayoutSettings } from '@/stores/modules/LayoutrSettings'
const lauoutSettings = useLayoutSettings()
console.log(logo);


</script>

<style scoped lang="scss">
$base-menu-logo-height: 50px;
$base-logo-title-fontSize: 20px;

.logo_container {
  display: flex;
  align-items: center;
  padding: 17px;
  transition-duration: 0.3s;

  p {
    color: white;
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
    white-space: nowrap;
  }

  .logo_ico {
    height: $base-menu-logo-height;
  }
}

.fold {
  padding-left: 10px;
}
</style>
