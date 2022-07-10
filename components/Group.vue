<script setup lang="ts">
import {defineAsyncComponent, ref, unref} from 'vue'
import type {Component} from 'vue'

interface GroupCom {
  itemA: Component,
  itemB: Component
}

const groupCom: GroupCom = {
  itemA: defineAsyncComponent(() => import('./ItemA.vue')),
  itemB: defineAsyncComponent(() => import('./ItemB.vue'))
}

const active = ref<keyof GroupCom>('itemA')
const toggle = () => active.value = unref(active) === 'itemA' ? 'itemB' : 'itemA'
</script>

<template>
  <div>
    <div><button
        border="~ gray-400 opacity-50 rounded-md"
        p="2"
        font="mono"
        outline="!none"
        hover:bg="gray-400 opacity-20"
        @click="toggle">toggle</button></div>
    <transition name="fade" mode="out-in">
      <Component :is="groupCom[active]"/>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>