<script setup lang="ts">
import Layout from "@/components/Layout/Layout.vue";
import {onMounted} from "vue";
import {useMainStore} from './stores/main'
import {zhCN} from "naive-ui";

const mainStore = useMainStore();

onMounted(() => {
  mainStore.initDocumentTheme();
  let media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', e => {
    mainStore.changeTheme(e.matches ? 'dark' : 'light');
  });
});

</script>

<template>
  <n-config-provider :locale="zhCN" :theme="mainStore.activeTheme">
    <n-loading-bar-provider>
      <div>
        <n-message-provider>
          <n-dialog-provider>
            <Layout />
          </n-dialog-provider>
        </n-message-provider>
      </div>
    </n-loading-bar-provider>
  </n-config-provider>
</template>