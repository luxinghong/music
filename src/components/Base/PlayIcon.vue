<script setup lang="ts">

import {PlayFilledAlt} from "@vicons/carbon";
import {useThemeVars} from "naive-ui";

const themeVars = useThemeVars();
</script>

<template>
<div class="play-icon">
  <n-icon :component="PlayFilledAlt" :size="20" :color="themeVars.primaryColor"/>
</div>
</template>

<style scoped>
.play-icon {
  @apply absolute right-4 bottom-4 flex items-center justify-center bg-white rounded-full
  w-10 h-10 opacity-0  group-hover:opacity-100 transition-opacity duration-700
}
</style>