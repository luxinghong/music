<script setup lang="ts">
import {useAsyncState, useElementHover} from "@vueuse/core";
import {getBanner, getPersonalized} from "@/service";
import {ref} from "vue";

const {state: banners, isLoading} = useAsyncState(getBanner().then(res => res.data.banners), []);
const hoverRef = ref()
const isHovered = useElementHover(hoverRef);
const {state:SongsList,isLoading:SongsIsLoading} = useAsyncState(getPersonalized().then(res => res.data.result),[]);
</script>

<template>
  <div class="p-6">
    <div v-if="isLoading" class="flex items-center">
      <n-skeleton width="25%" height="170px" :sharp="false"/>
      <n-skeleton width="50%" height="250px" :sharp="false"/>
      <n-skeleton width="25%" height="170px" :sharp="false"/>
    </div>
    <div  v-else ref="hoverRef" class="cursor-pointer">
      <n-carousel
        effect="card"
        dot-type="line"
        draggable
        prev-slide-style="transform: translateX(-150%) translateZ(-450px);opacity:0.5"
        next-slide-style="transform: translateX(50%) translateZ(-450px);opacity:0.5"
        style="height: 250px"
        :show-dots="false"
        :autoplay="!isHovered"
      >
        <n-carousel-item
            v-for="item in banners"
            :key="item.imageUrl"
            :style="{ width: '50%' }"
        >
          <load-img :src="item.imageUrl"  height="250px" >
          </load-img>
        </n-carousel-item>
      </n-carousel>
    </div>
    <p class="text-xl pb-4">推荐歌单</p>
    <song-list-skeleton v-if="SongsIsLoading"/>
    <SongList v-else :songs="SongsList"/>
  </div>
</template>

<style scoped>

</style>