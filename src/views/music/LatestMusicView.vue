<script setup lang="ts">
import { computed, type CSSProperties, ref } from 'vue';
import useThemeStyle from '@/hook/useThemeStyle';
import { getTopSong } from '@/service';
import { useQuery } from '@tanstack/vue-query';
import { useMainStore } from '@/stores/main';
import { mapSongs } from '@/utils/arr-map';
import LoadImg from '@/components/Base/LoadImg.vue';
import { formatSongsAuthor } from '@/utils';
import PlayIcon from '@/components/Base/PlayIcon.vue';

const mainStore = useMainStore();

const typeList = [
  {
    value: '0',
    name: '全部',
  },
  {
    value: '7',
    name: '华语',
  },
  {
    value: '96',
    name: '欧美',
  },
  {
    value: '8',
    name: '日本',
  },
  {
    value: '16',
    name: '韩国',
  },
];
const { themeVars, stripedClass } = useThemeStyle();
const activeType = ref('0');
const activeStyle = (value: string): CSSProperties => {
  return {
    color:
      value === activeType.value
        ? themeVars.value.primaryColor
        : themeVars.value.textColorBase,
    opacity: value === activeType.value ? 1 : '0.5',
    fontSize: value === activeType.value ? '0.9rem' : '0.8rem',
  };
};

const tagColor = computed(() => {
  return {
    textColor: themeVars.value.primaryColor,
    borderColor: themeVars.value.primaryColor,
  };
});

const { data: songs, isPending } = useQuery({
  queryKey: ['getTopSong', activeType],
  queryFn: () => getTopSong(activeType.value),
  select: (res) => mainStore.mapSongListAddLike(mapSongs(res.data.data)),
  staleTime: 10 * 1000,
});

const handleTypeClick = (value: string) => {
  activeType.value = value;
};

const handleMouseEnter = (e: MouseEvent, value: string) => {
  if (value === activeType.value) {
    return;
  }
  (e.target as HTMLElement).style.opacity = '1';
};
const handleMouseLeave = (e: MouseEvent, value: string) => {
  if (value === activeType.value) {
    return;
  }
  (e.target as HTMLElement).style.opacity = '0.8';
};
</script>

<template>
  <div class="sticky top-0 z-10 p-4 bg-slate-50 dark:bg-black">
    <span
      v-for="item in typeList"
      :key="item.value"
      class="px-2 cursor-pointer opacity-50 hover:opacity-100"
      :style="activeStyle(item.value)"
      @click="handleTypeClick(item.value)"
      @mouseenter="handleMouseEnter($event, item.value)"
      @mouseleave="handleMouseLeave($event, item.value)"
    >
      {{ item.name }}
    </span>
  </div>
  <div class="mt-4">
    <div v-show="isPending">
      <div
        v-for="item in 9"
        :key="item"
        class="p-2 flex justify-center items-center"
      >
        <div class="flex items-center">
          <n-skeleton width="15px" type="text" class="mt-2" />
          <n-skeleton
            width="64px"
            height="64px"
            :sharp="false"
            class="mt-2 ml-2"
          />
        </div>
        <n-skeleton
          type="text"
          width="30%"
          height="30px"
          class="m-4"
          :repeat="3"
        />
        <n-skeleton width="5%" height="30px" type="text" class="m-2" />
      </div>
    </div>
    <transition name="slide" appear mode="out-in">
      <ul v-show="!isPending" class="pl-10">
        <li
          v-for="(item, index) in songs"
          :key="item.id"
          :class="'flex items-center py-2 px-4 ' + stripedClass(index)"
        >
          <div class="flex items-center">
            <p>{{ index < 9 ? '0' + (index + 1) : index + 1 }}</p>
            <div class="ml-4 relative">
              <load-img
                :src="item.album.picUrl"
                height="64px"
                class-name="h-16 w-16 rounded-md"
              />
              <play-icon
                :size="15"
                class="cursor-pointer position-center"
                :style="{ opacity: 1, width: '25px', height: '25px' }"
              />
            </div>
          </div>
          <p class="ml-6 flex-1">
            {{ item.name }}
            <n-tag v-if="item.mvid !== 0" :color="tagColor" size="small"
              >MV</n-tag
            >
          </p>
          <p class="ml-2 flex-1 opacity-80">
            {{ formatSongsAuthor(item.artists) }}
          </p>
          <p class="ml-2 flex-1 opacity-80">{{ item.album.name }}</p>
          <n-time
            class="pl-4 mx-2 text-left opacity-80"
            :time="item.bMusic?.playTime"
            format="mm:ss"
          />
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped></style>
