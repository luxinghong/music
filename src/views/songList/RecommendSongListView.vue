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

const loadMore = () => {
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
  });
};
</script>

<template>
  <div class="px-6">
    <div v-if="!currentSongList.list[0]">123</div>
    <div class="relative rounded-xl cursor-pointer h-44 overflow-hidden mt-4">
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
          <n-tag type="success">{{ selectValue }}</n-tag>
          <p class="text-white py-2">
            {{ currentSongList.list[0]?.name }}
          </p>
          <n-ellipsis
            :line-clamp="5"
            :tooltip="false"
            class="text-white text-xs opacity-80"
          >
            {{ currentSongList.list[0]?.description }}
          </n-ellipsis>
        </div>
      </div>
    </div>
    <div>
      <n-tabs v-model:value="selectValue">
        <n-tab-pane v-for="tab in songsTags" :key="tab.name" :name="tab.name">
          <div class="mt-4">
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
</template>

<style scoped>
:deep(.n-tabs-bar) {
  display: none;
}
:deep(.n-tabs .n-tabs-nav.n-tabs-nav--line-type .n-tabs-nav-scroll-content) {
  transition: border-color 0.3s var(--n-bezier);
  border: none;
}
:deep(.n-tag__content) {
  display: flex;
}
:deep(.n-tabs .n-tab-pane) {
  padding-top: 0;
}
:deep(.n-tabs .n-tabs-nav) {
  overflow-x: scroll;
  position: sticky;
  top: 0px;
  z-index: 999;
  padding-top: 10px;
  background-color: v-bind(bodyColor);
}
:deep(.n-tabs .n-tabs-nav::-webkit-scrollbar-thumb) {
  height: 15px;
  background-color: transparent;
}
:deep(.n-tabs .n-tabs-nav):hover.n-tabs-nav::-webkit-scrollbar-thumb {
  @apply bg-gray-400/40;
}
:deep(.n-tabs .n-tabs-nav-scroll-wrapper) {
  overflow: visible;
}
</style>
