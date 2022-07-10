<script setup lang="ts">
import {reactive} from "vue";
import MiniForm, {MiniFormProps} from './MiniForm.vue'
const userForm = reactive<MiniFormProps>({
  username: '',
  password: ''
})
</script>

<template>
  <MiniForm
      v-model:username="userForm.username"
      v-model:password="userForm.password"
  />

  <pre text="xs">{{ userForm }}</pre>
</template>
