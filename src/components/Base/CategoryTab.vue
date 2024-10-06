<script setup lang="ts">
import { ref } from 'vue';

export interface MvListItemProps {
  name: string;
  list: string[];
  type: string;
}
const props = defineProps<MvListItemProps>();
let activeIndex = ref(0);
const emit = defineEmits<{
  'tag-changed': [type: string, item: string];
}>();

const handleClick = (type: string, item: string, index: number) => {
  activeIndex.value = index;
  emit('tag-changed', type, item);
};
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
        @click="handleClick(type, item, index)"
      >
        <n-tag checkable round :checked="index === activeIndex">{{
          item
        }}</n-tag>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
