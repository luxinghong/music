<script setup lang="ts">

import {Search} from "@vicons/ionicons5";
import {useAsyncState} from "@vueuse/core";
import {getDefaultSearchKeyWord} from "@/service";

const {state: defaultSearchKeyWord} = useAsyncState(getDefaultSearchKeyWord().then(res=>res.data.data),{});
</script>

<template>
<div class="w-52">
  <div>
    <n-input round size="small" class="ml-5" :placeholder="defaultSearchKeyWord.showKeyword">
      <template #prefix>
        <n-icon :component="Search"></n-icon>
      </template>
    </n-input>
  </div>
</div>
</template>

<style>

</style>