<script setup lang="ts">
import {ref, onMounted, onUnmounted} from "vue"
const color = ref('red')

let timer: number | null = null

onMounted(() => {
  timer = setInterval(() => {
    color.value = `#${Math.trunc(0xffffff * Math.random()).toString(16)}`
  }, 500)
})

onUnmounted(() => {
  clearInterval(timer!)
  timer = null
})

</script>

<template>
  <p class="paragraph">{{ color }}</p>
</template>

<style scoped>
.paragraph {
  color: v-bind(color);
}
</style>
