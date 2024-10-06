<script setup lang="ts">
import CategoryTab from '@/components/Base/CategoryTab.vue';
import MvList from '@/components/MvList.vue';
import { useQuery } from '@tanstack/vue-query';
import { nextTick, ref, watch, watchEffect } from 'vue';
import { getMvList } from '@/service';
import MvListSkeleton from '@/components/MvListSkeleton.vue';

const categoryList = [
  {
    type: 'area',
    name: '地区',
    list: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
  },
  {
    type: 'type',
    name: '类型',
    list: ['全部', '官方版', '现场版', '原生', '网易出品'],
  },
  { type: 'order', name: '排序', list: ['最热', '最新', '上升最快'] },
];

const params = ref<Record<string, string | undefined>>({
  area: categoryList.find((item) => item.type === 'area')?.list[0],
  type: categoryList.find((item) => item.type === 'type')?.list[0],
  order: categoryList.find((item) => item.type === 'order')?.list[0],
});

const pageCount = ref(10);
const page = ref(1);
const pageSize = ref(50);

watch(pageSize, () => {
  if (page.value !== 1) {
    page.value = 1;
  }
});

const getParams = () => {
  return {
    ...params.value,
    limit: pageSize.value,
    offset: (page.value - 1) * pageSize.value,
  };
};

const { data: list, isPending } = useQuery({
  queryKey: ['getMvList', params, page, pageSize],
  queryFn: async () => {
    const result = await getMvList(getParams());
    if (result.data.count) {
      pageCount.value = Math.round(result.data.count / pageSize.value);
    }
    return result.data.data;
  },
  staleTime: 3 * 60 * 1000,
});

watchEffect(async () => {
  if (!isPending.value) {
    await nextTick();
    const backTopElement = document.querySelector('.n-back-top') as HTMLElement;
    if (backTopElement) {
      backTopElement.click();
    }
  }
});

const handleTagChanged = (type: string, tag: string) => {
  if (page.value !== 1) {
    page.value = 1;
  }
  params.value[type] = tag;
};
</script>

<template>
  <div class="p-6">
    <category-tab
      v-for="(item, index) in categoryList"
      :key="index"
      :name="item.name"
      :list="item.list"
      :type="item.type"
      @tag-changed="handleTagChanged"
    />
    <div class="py-6">
      <mv-list-skeleton v-if="isPending" :count="pageSize" />
      <mv-list v-else :list="list" />
      <div class="flex mt-4 justify-end">
        <n-pagination
          v-model:page="page"
          :page-count="pageCount"
          v-model:page-size="pageSize"
          show-size-picker
          :page-sizes="[10, 20, 30, 40, 50]"
        />
      </div>
    </div>
    <n-back-top />
  </div>
</template>

<style scoped></style>
