<script setup lang="ts">
export interface MvListItemProps {
  name: string;
  list: string[];
}
const props = defineProps<MvListItemProps>();
</script>

<template>
  <div class="flex items-center py-2">
    <span> {{ name }}： </span>
    <div class="flex w-3/5">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="flex items-center justify-center"
        style="flex: 0.1666"
      >
        <n-tag checkable round :checked="index === 0">{{ item }}</n-tag>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
