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
let loadStatus: 'pending' | 'loading' | 'done' = 'pending';

const observerCallback = (entries: IntersectionObserverEntry[]) => {
  if (props.noMore) {
    loadingTarget && observer.disconnect();
    return;
  }
  let visible = entries[0].isIntersecting;
  if (visible) {
    if (loadStatus === 'loading') {
      return;
    }
    loadStatus = 'loading';
    props.loadMore(() => (loadStatus = 'done'));
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
  <div
    ref="loadingTarget"
    v-if="!noMore"
    class="my-4 flex items-center justify-center w-full"
  >
    <n-spin :size="size" />
  </div>
  <n-divider v-else dashed> 我也是有底线的! </n-divider>
</template>

<style scoped></style>
