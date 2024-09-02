<script setup lang="ts">

import {Play} from "@vicons/carbon";
import {formatNumber} from "@/utils";

defineProps<{songs?:any[]}>()
</script>

<template>
  <div v-if="songs && songs.length !== 0" class="mb-4">
    <n-grid cols="2 s:3 m:5 l:5 xl:5 2xl:7" responsive="screen" :x-gap="12" :y-gap="8">
      <n-grid-item v-for="(item,index) in songs" :key="index" class="group cursor-pointer">
        <n-card size="small" footer-style="padding: 5px 10px">
          <template #cover>
            <div class="relative">
              <load-img :src="item.picUrl || item.coverImgUrl" class-name="w-full h-full"/>
              <div class="flex justify-end items-center absolute top-0 right-0 p-1 text-white card-mask w-full">
                <n-icon :component="Play" />
                <span class="pl-1">{{formatNumber(item.playCount)}}</span>
              </div>
              <play-icon/>
            </div>
          </template>
          <template #footer>
            <n-ellipsis>{{item.name}}</n-ellipsis>
          </template>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
  <div v-else style="height: 300px">123</div>
</template>

<style scoped>

</style>