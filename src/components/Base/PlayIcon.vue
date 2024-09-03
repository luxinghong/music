<script setup lang="ts">

import {PlayFilledAlt} from "@vicons/carbon";
import {useThemeVars} from "naive-ui";
import {computed, type CSSProperties} from "vue";

const themeVars = useThemeVars();

interface IconProps {
  style?: CSSProperties
  color?: string
  size?: number
}

const props = defineProps<IconProps>();

const color = computed(() => props.color || themeVars.value.primaryColor);
const size = computed(() => props.size ?? 20);
</script>

<template>
<div :class="['play-icon', !style && 'right-4 bottom-4']" :style="style">
  <n-icon :component="PlayFilledAlt" :size="size" :color="color"/>
</div>
</template>

<style scoped>
.play-icon {
  @apply absolute flex items-center justify-center bg-white rounded-full
  w-10 h-10 opacity-0  group-hover:opacity-100 transition-opacity duration-700
}
</style>