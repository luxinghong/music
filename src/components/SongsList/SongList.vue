<script setup lang="ts">

defineProps<{songs?:any[]}>()
</script>

<template>
  <div  v-if="songs && songs.length !== 0">
    <n-grid cols="2 s:3 m:5 l:5 xl:5 2xl:7" responsive="screen"></n-grid>
      <n-grid-item v-for="(item,index) in songs" :key="index">
        <n-card size="small">
          <template #cover>
            <div>
              <n-image />
            </div>
          </template>
        </n-card>
      </n-grid-item>
  </div>
  <div v-else/>
</template>

<style scoped>

</style>