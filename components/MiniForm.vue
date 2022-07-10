<script setup lang="ts">
export interface MiniFormProps {
  username: string,
  password: string
}
const props = defineProps<MiniFormProps>()
const emits = defineEmits<{
  (e: 'update:username', username: string): void
  (e: 'update:password', password: string): void
}>()

const setUsername = (e: InputEvent) => {
  emits('update:username', (<HTMLInputElement>e.target).value)
}

const setPassword = (e: InputEvent) => {
  emits('update:password', (<HTMLInputElement>e.target).value)
}
</script>

<template>
  <form grid="~ cols-2 gap-2">
    <label>
      <span>username:</span>
      <input border="~" type="text" :value="username" @input="setUsername">
    </label>
    <label>
      <span>password:</span>
      <input border="~" type="text" :value="password" @input="setPassword">
    </label>
  </form>
</template>