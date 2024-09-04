<script setup lang="ts">

defineProps<{
  list?: any[]
}>()
</script>

<template>
  <div v-if="list && list.length !== 0">
    <n-grid
        cols="2 s:3 m:4 l:4 xl:4 2xl:4"
        responsive="screen"
        x-gap="20"
        y-gap="20"
    >
      <n-grid-item
          v-for="item in list"
          :key="item.id"
      >
        <mv-list-img-item :item="item"/>
        <div>
          <p class="text-base mt-1">
            <n-ellipsis> {{ item.name }} </n-ellipsis>
          </p>
          <p class="mt-2 text-sm opacity-60">
            <n-ellipsis> {{ item.artistName }} </n-ellipsis>
          </p>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style scoped>

</style>