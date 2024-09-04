<script setup lang="ts">
withDefaults(defineProps<{
  count?: number
}>(),{
  count: 0
})
</script>

<template>
  <n-grid
    cols="4"
    responsive="screen"
    x-gap="20"
    y-gap="20"
  >
    <n-grid-item
      v-for="(item,index) in count"
    >
      <n-skeleton :sharp="false" height="10vw" width="100%"/>
      <n-skeleton :sharp="false" text :repeat="2"/>
    </n-grid-item>
  </n-grid>
</template>

<style scoped>

</style>