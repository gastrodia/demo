<script setup lang="ts">
import {useTime} from "./useTime"
const [newTime] = useTime()
</script>

<template>
  <h2>{{newTime.toLocaleString()}}</h2>
</template>