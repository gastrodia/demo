<script setup lang="ts">
import A from './A.vue'
import B from './B.vue'
</script>

<template>
  <div grid="~ cols-2 gap-2" border="~ gray-200 opacity-50" p="6">
    <div border="~ gray-200 opacity-50" pb="5">
      <h5 border="b gray-200 opacity-50" indent="2">A.vue</h5>
      <div text="center" mt="3"><A/></div>
    </div>

    <div border="~ gray-200 opacity-50" pb="5">
      <h5 border="b gray-200 opacity-50" indent="2">B.vue</h5>
      <div text="center" mt="3"><B/></div>
    </div>
  </div>
</template>