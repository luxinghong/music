<script setup lang="ts">
import { getTopPlayList, getTopPlayListTags } from '@/service';
import { computed, onBeforeMount, ref, watch } from 'vue';
import LoadImg from '@/components/Base/LoadImg.vue';
import { useAsyncState } from '@vueuse/core';
import SongList from '@/components/SongsList/SongList.vue';
import ListLoading from '@/components/Base/ListLoading.vue';
import { getArrLast } from '@/utils';
import { useThemeVars } from 'naive-ui';

const songs = ref<{ list: any[]; loading: boolean; noMore: boolean }[]>([]);
const selectValue = ref('全部');
const selectIndex = ref(0);
const currentSongList = computed(() => songs.value[selectIndex.value]);
const themeVars = useThemeVars();
const bodyColor = computed(() => themeVars.value.bodyColor);

const fetchSongList = async (cat = '全部', index = 0) => {
  songs.value[index] = {
    list: [],
    loading: true,
    noMore: false,
  };
  getTopPlayList({ cat, limit: 50 }).then((res) => {
    let playlists = res.data.playlists;
    if (Array.isArray(playlists) && playlists.length > 0) {
      songs.value[index].list = res.data.playlists;
      songs.value[index].loading = false;
      songs.value[index].noMore = !res.data.more;
    }
  });
};

onBeforeMount(() => {
  fetchSongList();
});

const { state: songsTags, isLoading: songsTagsIsLoading } = useAsyncState(
  getTopPlayListTags().then((res) => {
    return [{ name: '全部' }].concat(res.data.tags);
  }),
  []
);

const findIndex = (val: string) =>
  songsTags.value.findIndex((item) => item.name === val);

watch(
  () => selectValue.value,
  async (newVal, oldValue) => {
    let index = findIndex(newVal);
    selectIndex.value = index;
    if (!songs.value[index]) {
      await fetchSongList(selectValue.value, index);
    }
  }
);

const loadMore = (successCallback: () => void) => {
  getTopPlayList({
    cat: selectValue.value,
    limit: 20,
    before: getArrLast(songs.value[selectIndex.value].list).updateTime,
  }).then((res) => {
    let playlists = res.data.playlists;
    if (Array.isArray(playlists) && playlists.length > 0) {
      songs.value[selectIndex.value].list.push(...playlists);
    }
    songs.value[selectIndex.value].noMore = !res.data.more;
    successCallback && successCallback();
  });
};
</script>

<template>
  <div class="px-6">
    <div v-if="!currentSongList.list[0]" class="relative">
      <div class="flex p-4">
        <n-skeleton class="w-36 h-36 rounded-xl" />
        <div class="ml-4 flex-1">
          <n-skeleton width="70px" height="28px" :sharp="false" />
          <n-skeleton class="my-2" :sharp="false" text />
          <n-skeleton class="h-20" :sharp="false" text />
        </div>
      </div>
    </div>
    <div
      v-else
      class="relative rounded-xl cursor-pointer h-44 overflow-hidden mt-4"
    >
      <div
        class="w-full h-44 absolute blur-lg"
        :style="{
          backgroundImage: `url(${currentSongList.list[0]?.coverImgUrl})`,
        }"
      />
      <div class="flex absolute p-4 bg-black/30">
        <load-img
          :src="currentSongList.list[0]?.coverImgUrl"
          height="144px"
          class-name="w-36 h-36 rounded-md"
        />
        <div class="ml-4 flex-1">
          <n-tag type="success" size="large">{{ selectValue }}</n-tag>
          <p class="text-white text-sm py-2">
            {{ currentSongList.list[0]?.name }}
          </p>
          <n-ellipsis
            :line-clamp="4"
            :tooltip="false"
            class="text-white text-sm opacity-80"
          >
            {{ currentSongList.list[0]?.description }}
          </n-ellipsis>
        </div>
      </div>
    </div>
    <div class="relative mt-2">
      <div v-if="songsTagsIsLoading" class="flex justify-between mt-4">
        <n-skeleton height="28px" :sharp="false" />
      </div>
      <div v-else class="mt-2">
        <n-tabs v-model:value="selectValue" type="card" class="multiline-tabs">
          <n-tab-pane
            v-for="tab in songsTags"
            :key="tab.name"
            :name="tab.name"
            display-directive="show:lazy"
          >
            <div v-if="currentSongList.loading">
              <n-grid :cols="5" :x-gap="12" y-gap="8">
                <n-grid-item v-for="(item, index) in 15" :key="index">
                  <n-skeleton height="15vw" width="100%" :sharp="false" />
                  <n-skeleton text :sharp="false" />
                </n-grid-item>
              </n-grid>
            </div>
            <div v-else class="mt-4">
              <song-list :songs="currentSongList.list" />
              <list-loading
                v-if="currentSongList.list.length > 15"
                :no-more="currentSongList.noMore"
                :load-more="loadMore"
              />
            </div>
          </n-tab-pane>
        </n-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped>
.multiline-tabs {
  display: flex;
  flex-wrap: wrap; /* 允许标签换行 */
}

:deep(.multiline-tabs .n-tabs-wrapper) {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

:deep(.multiline-tabs .n-tabs-tab) {
  flex: 1 1 120px; /* 固定宽度 */
  margin-right: 10px; /* 列之间的间隔 */
  margin-bottom: 10px; /* 行之间的间隔 */
  text-align: center; /* 文字居中对齐 */
  white-space: nowrap; /* 防止文字换行 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1f1f1f; /* 初始背景色 */
  color: white; /* 初始文字颜色 */
  border-radius: 6px; /* 添加圆角 */
  transition: all 0.3s ease; /* 动画效果的过渡 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 初始的轻微阴影 */
}

:deep(.n-tabs .n-tabs-tab-pad) {
  width: 0;
}

:deep(
    .n-tabs
      .n-tabs-nav.n-tabs-nav--top.n-tabs-nav--card-type
      .n-tabs-tab.n-tabs-tab--active
  ) {
  font-size: 16px;
  font-weight: bolder;
}

:deep(.n-tabs .n-tabs-tab):hover {
  background: linear-gradient(
    145deg,
    #403f44,
    #84878b
  ); /* 悬停时灰黑渐变到银灰色 */
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.4),
    0px 0px 15px rgba(132, 135, 139, 0.8); /* 深色光晕，具有金属质感 */

  transform: scale(1.1); /* 鼠标悬停时轻微放大 */
  color: #ffffff; /* 悬停时文字颜色 */
}
</style>
