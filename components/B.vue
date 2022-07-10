<!-- B.vue -->
<script setup lang="ts">
import {count, updateCount} from './common'
</script>

<template>
  <h2>{{count}}</h2>
  <button
      border="~ gray-400 opacity-50 rounded-md"
      p="2"
      font="mono"
      outline="!none"
      hover:bg="gray-400 opacity-20"
      @click="updateCount(count - 1)"
  >reduce</button>
</template>