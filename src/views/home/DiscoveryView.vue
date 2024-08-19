<script setup lang="ts">
import {useAsyncState} from "@vueuse/core";
import {getBanner} from "@/service";

const {state: banners, isLoading} = useAsyncState(getBanner().then(res => res.data.banners), []);
</script>

<template>
  <div>
    <div v-if="isLoading">
      <n-skeleton/>
      <n-skeleton/>
      <n-skeleton/>
    </div>
    <div v-else class="cursor-pointer">
      <n-carousel
        effect="card"
        dot-type="line"
        draggable
        prev-slide-style="transform: translateX(-150%) translateZ(-450px);opacity:0.5"
        next-slide-style="transform: translateX(50%) translateZ(-450px);opacity:0.5"
        style="height: 250px"
      >
        <n-carousel-item
            v-for="item in banners"
            :key="item.imageUrl"
            :style="{ width: '60%' }"
        >
          <img :src="item.imageUrl" alt="" class="rounded group-hover-scale">
        </n-carousel-item>
      </n-carousel>
    </div>
  </div>
</template>

<style scoped>

</style>