<script setup lang="tsx">
import {RouterLink, useRoute} from "vue-router";
import {NIcon} from 'naive-ui';
import {SparklesOutline,List,VideocamOutline} from "@vicons/ionicons5";
import {Music,User} from '@vicons/carbon';
import {ref, watch} from "vue";
import {useMainStore} from "@/stores/main";

const mainStore = useMainStore();

const menuOptions = [
  {
    label: () => <RouterLink to="/discovery">发现音乐</RouterLink>,
    key: '/discovery',
    icon: () => <NIcon component={SparklesOutline}/>
  },
  {
    label: () => <RouterLink to='/songList'>推荐歌单</RouterLink>,
    key: '/songList',
    icon: () => <NIcon component={List} />
  },
  {
    label: () => <RouterLink to='/latestMusic'>最新音乐</RouterLink>,
    key: '/latestMusic',
    icon: () => <NIcon component={Music} />
  },
  {
    label: () => <RouterLink to='/latestMv'>最新MV</RouterLink>,
    key: '/latestMv',
    icon: () => <NIcon component={VideocamOutline} />
  }
];

const noLoginOption = {
  label: () => <div><p>未登录</p></div>,
  key: 'login',
  icon: () => <NIcon class="mr-2" size={20} component={User}/>
}

let activeKey = ref<string | null>('');
let collapsed = ref(false);
const myMenuOptions = ref(menuOptions);
let hiddenLeftMenu = ref(false);

watch(() => mainStore.userProfile, (val) => {
  let userId = mainStore.userProfile?.profile?.userId;
  if (val && userId) {

  } else {

  }
})

const changeMenuOptions = () => {
  if (!mainStore.isLogin) {
    myMenuOptions.value = [noLoginOption,...menuOptions];
  }
}

if (!mainStore.isLogin) {
  changeMenuOptions();
}

const route = useRoute()
watch(() => route.path, newVal => {
  activeKey.value = newVal;
  hiddenLeftMenu.value = !!route.meta.hidden;
})

</script>
<template>
<n-layout has-sider>
  <n-layout-sider
    v-show="!hiddenLeftMenu"
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    width = "192"
    show-trigger
    :collapsed="collapsed"
    @collapse = "collapsed=true"
    @expand="collapsed=false"
  >
    <n-menu
      v-model:value="activeKey"
      :collapsed = "collapsed"
      :collapsed-width = "64"
      :collapsed-icon-size = "22"
      :options = "myMenuOptions"
      :default-expand-all = "true"
    />
  </n-layout-sider>
  <n-layout>
    <router-view v-slot="{ Component }">
      <component :is="Component"/>
    </router-view>
  </n-layout>
</n-layout>
</template>
<style></style>