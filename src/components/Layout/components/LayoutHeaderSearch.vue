<script setup lang="ts">

import {Search} from "@vicons/ionicons5";
</script>

<template>
<div>
  <div>
    <n-input round>
      <template #prefix>
        <n-icon :component="Search" @click="() => toSearchResult()"></n-icon>
      </template>
    </n-input>
  </div>
</div>
</template>

<style>

</style>