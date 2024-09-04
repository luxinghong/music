<script setup lang="ts">
import {formatNumber} from "@/utils";
import {Play} from "@vicons/carbon";

withDefaults(defineProps<{
  item: any,
  height?: string,
  borderRadius?: string
}>(),{
  height: '9vw',
  borderRadius: '10px'
})
</script>

<template>
  <div :style="{borderRadius}" class="relative flex-1">
    <load-img
      :src="item.picUrl || item.cover"
      :height="height"
    />
    <div
        :style="{borderRadius}"
        class=" absolute top-0 right-0 p-1 flex justify-end items-center text-white rounded-t-md "
    >
      <n-icon :component="Play" />
      <span class="pl-1">{{ formatNumber(item.playCount) }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>