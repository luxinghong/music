<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

export interface ListLoadingProps {
  size?: 'small' | 'medium' | 'large';
  noMore: boolean;
  loadMore?: (loadSuccess: () => void) => void;
}

const props = withDefaults(defineProps<ListLoadingProps>(), {
  size: 'large',
  loadMore: () => {},
});

const loadingTarget = ref<HTMLElement | null>(null);

const observerCallback = (entries: IntersectionObserverEntry[]) => {
  if (props.noMore) {
    loadingTarget && observer.disconnect();
    return;
  }
  let visible = entries[0].isIntersecting;
  if (visible) {
    // props.loadMore(() => {});
  }
};

const observer = new IntersectionObserver(observerCallback);

onMounted(() => {
  loadingTarget.value && observer.observe(loadingTarget.value);
});

onUnmounted(() => {
  observer.disconnect();
});
</script>

<template>
  <div ref="loadingTarget" v-if="!noMore" style="height: 68px">
    <n-spin :size="size" />
  </div>
  <n-divider v-else dashed> 我也是有底线的! </n-divider>
</template>

<style scoped>
/*:deep(.n-base-loading .n-base-loading__container) {
  animation: none;
}*/
</style>
