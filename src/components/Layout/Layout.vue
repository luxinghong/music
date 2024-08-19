<script setup lang="ts">
import {onMounted} from "vue";
import {useMainStore} from "@/stores/main";
import {useDialog, useMessage} from "naive-ui";
import BaseHeader from '@/components/Layout/components/LayoutHeader.vue';

const mainStore = useMainStore();
const dialog = useDialog();

window.$message = useMessage();

onMounted(() => {
  if (!mainStore.isLogin) {
    dialog.info({
      title: '提示',
      content: '由于网易云接口限制,建议请先登录'
    });
  }
});
</script>

<template>
  <div id="layout-container" style="width: 85vw; margin: auto">
    <n-layout>
      <base-header />
      <layout-left-menu />
<!--      <n-layout-footer></n-layout-footer>-->
    </n-layout>
  </div>
</template>

<style scoped>

</style>