<script setup lang="ts">
import {useAsyncState, useElementHover} from "@vueuse/core";
import {getBanner, getNewSong, getPersonalized} from "@/service";
import {ref} from "vue";
import {useMainStore} from "@/stores/main";
import {mapSongs} from "@/utils/arr-map";
import {formatSongsAuthor} from "@/utils";

const mainStore = useMainStore();
const {state: banners, isLoading} = useAsyncState(getBanner().then(res => res.data.banners), []);
const hoverRef = ref()
const isHovered = useElementHover(hoverRef);
const {state:SongsList,isLoading:SongsIsLoading} = useAsyncState(getPersonalized().then(res => res.data.result),[]);
const {state: newSongList, isLoading: newSongListIsLoading} = useAsyncState(
    getNewSong().then(res => mainStore.mapSongListAddLike(mapSongs(res.data.result))),
    []
)
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
    <p class="text-xl pb-4">最新音乐</p>
    <n-grid
      v-if="newSongListIsLoading"
      cols="3"
      x-gap="20"
      y-gap="20"
    >
        <n-grid-item
          v-for="(item,index) in 12"
          :key="index">
            <div class="flex justify-between h-16">
              <n-skeleton height="64px" width="64px" :sharp="false"/>
              <div class="flex-1 ml-2">
                <n-skeleton
                  text
                  class="mt-2"
                  :repeat="2"
                  :sharp="false"
                />
              </div>
            </div>
        </n-grid-item>
    </n-grid>
    <n-grid
        v-else
        cols="2 s:2 m:3 l:3 xl:3 2xl:4"
        x-gap="20"
        y-gap="20"
        responsive="screen"
    >
      <n-grid-item
          v-for="(item,index) in newSongList"
          :key="item.id"
          class="hover:bg-zinc-300/40 dark:hover:bg-gray-700/30 transition-colors cursor-pointer rounded-md"
      >
        <div class="flex justify-between h-16">
          <div class="relative">
            <load-img height="64px" width="64px"
              class-name="w-16 h-16 rounded-md "
              :src="item.picUrl"
            />
            <play-icon :size="15" class="cursor-pointer position-center" :style="{opacity:1, width:'25px', height:'25px'}"/>
          </div>
          <div class="flex-1 ml-2 truncate">
            <p class="mt-1 text-base">
              <n-ellipsis>{{item.name}}</n-ellipsis>
            </p>
            <p class="mt-2 text-sm opacity-60">
              <n-ellipsis>{{formatSongsAuthor(item.song.artists)}}</n-ellipsis>
            </p>
          </div>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style scoped>

</style>