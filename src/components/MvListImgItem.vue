<script setup lang="ts">
import {formatNumber} from "@/utils";
import {Play} from "@vicons/carbon";
import PlayIcon from "@/components/Base/PlayIcon.vue";

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
  <div :style="{borderRadius}" class="relative flex-1 overflow-hidden">
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
    <play-icon style="width: 40px; height: 40px" class="cursor-pointer position-center"/>
    <p v-if="item.copywriter" class="tips">
      {{ item.copywriter }}
    </p>
    <div :style="borderRadius" class="absolute bottom-0 w-full text-right bg-linear-mask">
      <n-time class="mr-2 text-white" :time="item.duration" format="mm:ss"/>
    </div>
  </div>
</template>

<style scoped>
.tips {
  @apply overflow-hidden absolute top-0 w-full h-0
  group-hover:h-8 leading-8 text-center text-white
  bg-black/50 transition-height
}
</style>