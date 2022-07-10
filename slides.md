---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# persist drawings in exports and build
drawings:
  persist: false
# use UnoCSS (experimental)
css: unocss
---
# Vue2.x to Vue3.2

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    start <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://gitee.com/boolean-true/demo" target="_blank" alt="GitHub"
    class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>
---

# about ^Vue3.2

> Vue3到目前为止最新的版本为~Vue3.2，两次小的版本升级为我们带来了非常多的新特性！

本次我们一起着重看下 `<script setup lang="ts"></script> ` 在开发中，
相较Vue2的一些不同点，及一些疑问。
*Vue3.2(搭配Typescript)

- ✔ **不再纠结 `ref` 和 `reactive`该使用谁**
- ✔ **组合式API的封装**
- ✔ **使用`Ts`开发时`props`和`emit`注意事项**
- ✔ **具名`v-model`**
- ✔ **模板`ref`获取子组件时的注意事项(`defineExpose`)**
- ✔ **\<style>中的新特性**
- ✔ **`component` `is` 相比Vue2使用上的注意点**
- ✔ **更好用的函数式组件**


<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---
preload: false
---

# ref & reactive

#### **`ref` 和 `reactive` 有什么不同？该何时使用`ref`，何时使用`reactive`？**

<br/>

> 在`Vue3`中，`reactive`和`ref`都可以将复杂数据类型的数据变成响应式，且是深度响应的，`ref`内部是通过`reactive`来支持的。
> 
> `reactive`不支持基本数据类型，`ref`是对`reactive`功能的补充，`ref`会将基本数据类型包装后再转成响应式。

<br/>

> `reactive`创建的响应式数据是不能更改其引用的，但是取值或更改值的时候更方便；
> 
> 而`ref`创建的响应式数据当需要变更或读取时候，需要从其`value`属性上获取。

所以我们不需要太纠结创建响应式对象时候该用哪一个函数，`reactive`可以实现功能`ref`也可以完成，`ref`函数是的`reactive`功能的增强；
当需要基本数据类型的时候只能用`ref`，但是复杂类型两个都可以用！

**当我们对一个`reactive`对象做解构操作时，解构出来的参数会丢失响应性，我们可以用`toRefs`来解决这个问题！**
**`ref`为复杂数据类型时也不要使用解构语法，同样会丢失响应性！**

<div
  v-motion
  :initial="{y: 40, opacity: 0}"
  :enter="{ y: 0, opacity: 1, transition: { delay: 1000 } }">

##### 推荐阅读：

[Vue3 中有场景是 reactive 能做而 ref 做不了吗？](https://juejin.cn/post/7109257658447691784)

</div>

---
preload: false
---

# Composition API 的封装

##### 1. 数据共享：
<div grid="~ cols-3 gap-2">

```vue
<!-- A.vue -->
<script setup lang="ts">
import {count, updateCount} from './common'
</script>

<template>
  <h1>{{count}}</h1>
  <button @click="updateCount(count + 1)">increase</button>
</template>
```

```typescript
/* common.ts */
import {ref} from 'vue'
const count = ref(0)
const updateCount = (v: number) => {
    count.value = v
}
export {
  count,
  updateCount     
}
```

```vue
<!-- B.vue -->
<script setup lang="ts">
import {count, updateCount} from './common'
</script>

<template>
  <h1>{{count}}</h1>
  <button @click="updateCount(count - 1)">reduce</button>
</template>
```
</div>

<div grid="~ cols-2 gap-2">

<!-- ./components/C.vue -->
<C />

<div>

**注意：**

> 我们用这种方式来共享数据时，`A`和`B`组件都销毁后，`common.ts`中的数据并不会被回收！


<div>

<div
  v-motion
  :initial="{ x: 100, y: 10, opacity: 0}"
  :enter="{ y: 10, x: 0, opacity: 1, transition: { delay: 1000 } }">

##### 推荐阅读：

[使用 Vue 3.0，你可能不再需要Vuex了！](https://blog.csdn.net/weixin_40906515/article/details/107679208)

</div>

</div>


</div>

</div>

---
preload: false
---

##### 2. 可组合函数（自定义hook）：
> “`hook`是一个函数，函数内部对`Composition API`进行了封装，且以通常以`use`开头命名，用来抽离逻辑。”

<br/>

<div grid="~ cols-2 gap-2">


```typescript
/* useTime.ts */

import {ref, onUnmounted, onMounted} from 'vue'

const useTime = (delay = 1000) => {
    const time = ref(new Date())
    let timer: null | number = null
    const clear = () => {
        clearInterval(timer!)
        timer = null
    }
    onMounted(() => {
        timer = setInterval(() => {
            time.value = new Date()
        }, delay)
    })
    onUnmounted(clear)
    return [time, clear]
}

export {useTime}
```


<div>

```vue
<!-- Usage -->
<script setup lang="ts">
import {useTime} from "./useTime"
const [newTime] = useTime()
</script>

<template>
  <h1>{{newTime.toLocaleString()}}</h1>
</template>
```

<div border="~ gray-200 opacity-50">
<h5 border="b gray-200 opacity-50" indent="2">preview</h5>
<div p="3 0">
  <!-- ./components/UseTimeDemo.vue -->
  <UseTimeDemo text="center"/>
</div>
</div>



<div
  v-motion
  :initial="{ x: -100, y: 0, opacity: 0}"
  :enter="{ x: 0, y: 56, opacity: 1, transition: { delay: 1000 } }">

##### 推荐阅读：

[Vue3 Hooks 探索？](https://juejin.cn/post/7008835573607563295)

</div>

</div>

</div>

---

# 使用 `Ts` 时 defineProps & defineEmits 的注意点

> 当`<script setup lang="ts">` 时 `Vue` 提供了 一些 预编译宏 `defineProps` 和 `defineEmits`等；
> 
> 这两个函数可以接收一个泛型参数或实体参数，这些编译器宏函数能在开发时很好的检查和辅助我们编写代码；
> 
> 我们使用这些编译器宏函数并不需要从`vue`包中导出；
> 
> `.vue` 单文件在`<script setup>` 转成 `setup(){}`后将其转成标准写法。

<div grid="~ cols-2 gap-2">

<div>

```vue
<script setup>
const props = defineProps({
  show: { type: Boolean,
    default: false
  }})
const emits = defineEmits(['update:show'])
</script>
```

</div>

<div>

```vue
<script lang="ts" setup>
const props = withDefaults(defineProps<{
  show?: boolean;
}>(), {
  show: false
})
</script>
```

</div>

</div>

<div display="flex" items="center">

<div flex="1">

```vue
<script setup lang="ts">
const props = defineProps<{
  show: boolean;
}>()
// 当传递泛型后不能再为函数传递实参，否则会报错！
const emits = defineEmits<{
  (e: 'update:show', show: boolean): void
}>()
</script>
```

</div>

<div px="4">
<label>编译后</label> <carbon:arrow-right class="inline"/>
</div>

<div flex="1">

```javascript
_defineComponent({
  props: {
    show: { type: Boolean, required: true }
  },
  emits: ["update:show"],
  setup(__props){
      // ..
  }
})
```

</div>

</div>

---

##### 预编译函数泛型参数传递的注意事项：

> 1. 只能在同一文件中的接口或类型字面量的引用；
> 2. 只能是类型字面量。

- ❌ 错误示例
<div grid="~ cols-2 gap-2">

<div grid="~ cols-2 gap-2">

```typescript h="full"
interface MyProps {
    message: string
}

export type { MyProps }
```

```vue h="full"
<!-- ❌ 错误1 -->
<script setup lang="ts">
import type {MyProps} from './type'

defineProps<MyProps>()
</script>
```

</div>

<div>

```vue h="full"
<!-- ❌ 错误2 -->
<script setup lang="ts">
interface MyProps {
  message: string,
  show: boolean
}
defineProps<Pick<MyProps, 'message'>>()
</script>
```

</div>

</div>

- ✔ 推荐写法

```vue
<script setup lang="ts">
export interface MyProps {
  message: string
}
defineProps<MyProps>()
</script>
```

使用`export`将`props type`导出可以方便我们在使用组件时候，获取到其`props` ts类型
我们在导入组件的的时候，Vue3是不推荐省略`.vue`后缀的，因为这可以使得我们在使用组件时候可以获得很好的代码提示和类型检查。

---
preload: false;
---

<div h="full" overflow="hidden" display="flex" flex="col">

<div display="flex" items="center">

# `v-model`

##### Vue3中可以为组件添加多个具名`v-model`
</div>

<div flex="1" overflow="hidden" grid="~ cols-2 gap-2">

<div h="full" overflow-y="auto">

```vue
<!-- MiniForm.vue -->
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
  <form>
    <label>
      <span>username:</span>
      <input type="text" :value="username" @input="setUsername">
    </label>
    <label>
      <span>password:</span>
      <input type="text" :value="password" @input="setPassword">
    </label>
  </form>
</template>
```


</div>

<div display="flex" flex="col">

<div>

```vue
<script setup lang="ts">
import {reactive} from "vue";
import MiniForm, {MiniFormProps} from './MiniForm.vue'
const userForm = reactive<MiniFormProps>({username: '',password: ''})
</script>

<template>
  <MiniForm v-model:username="userForm.username"
            v-model:password="userForm.password"/>
  <pre>{{ userForm }}</pre>
</template>
```

</div>

<div flex="1" border="~ gray-200 opacity-50">
<h5 border="b gray-200 opacity-50" indent="2">preview</h5>
<div p="3 0">
  <!-- ./components/UseMiniForm.vue -->
  <UseMiniForm/>
</div>
</div>

</div>

</div>

</div>

---
preload: false
---

# `<script setup>`中使用`ref`获取组件的注意点

使用 `<script setup>` 的组件是默认关闭的，使用模板 `ref` 或者 `$parent` 获取到的组件的时候，会获取不到对应组件在 `<script setup>` 中声明的数据。

<div grid="~ cols-2 gap-2">

```vue
<!-- Child.vue -->
<script setup lang="ts">
import {ref} from "vue"

const count = ref(0)
const setCount = () => {
  count.value += 1
}

</script>

<template>{{count}}</template>
```

<div>

```vue
<script setup lang="ts">
import {onMounted, ref} from "vue"
import Child from './Child.vue'
const childRef = ref<typeof Child | null>(null)
onMounted(() => {
  console.log(childRef.value?.count) // undefined
})
</script>

<template>
<Child ref="childRef"/>
</template>
```

</div>

</div>

✔ `defineExpose`编译器宏可以让我们手动暴露出需要的数据：

```typescript
defineExpose({count, setCount})
```

```typescript
console.log(childRef.value?.count) // 0
```
---
preload: false
---

# `<style>`中的变化和新特性

##### 1. 样式穿透：

> Vue3提供了新的深度选择器`:deep`
同时还新增了插槽选择器`:slotted`和 全局选择器`:global`(可以使样式应用到全局)

<br/>

##### 2. 非常好用的`v-bind`(状态驱动的动态 `CSS`)

<div grid="~ cols-2 gap-2">

<div>

```vue {all|3|12|all}
<script setup lang="ts">
import {ref} from "vue"
const color = ref('red')
</script>

<template>
  <p class="paragraph">hello</p>
</template>

<style scoped>
.paragraph {
  color: v-bind(color);
}
</style>
```

<arrow v-click="3" x1="300" y1="460" x2="230" y2="426" color="#564" width="3" arrowSize="1" />

</div>

<div my="1" border="~ gray-200 opacity-50">
<h5 border="b gray-200 opacity-50" indent="2">preview</h5>
<div p="3 0">
  <!-- ./components/Bind.vue -->
  <Bind/>
</div>
</div>


</div>

---
preload: false
---



<div h="full" overflow="hidden" display="flex" flex="col">

# component is 使用时的注意点

> 在`Vue2`中我们切换动态组件时 为`is`传如的是注册在`components`中的`key[string 类型]`
> 因为在 `<script setup>` 中我们导入组件后不需要注册， 此时我们应该传递的是一个组件实例`[Component 类型]`


<div flex="1" overflow="hidden" grid="~ cols-2 gap-2">

<div h="full" overflow-y="auto">

```vue
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
    <div><button @click="toggle">toggle</button></div>
    <Component :is="groupCom[active]"/>
  </div>
</template>
```


</div>

<div display="flex" flex="col">

```vue
<!-- ItemA.vue -->
<template>
  <h2>ItemA</h2>
</template>
```

```vue
<!-- ItemB.vue -->
<template>
  <h2>ItemB</h2>
</template>
```

<div flex="1" border="~ gray-200 opacity-50">
<h5 border="b gray-200 opacity-50" indent="2">preview</h5>
<div p="3 0">
  <!-- ./components/Group.vue -->
  <Group/>
</div>
</div>

</div>

</div>

</div>





---

# Learn More

|                                                                            |                                                                                   |
|----------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| `teleport`                                                                 | 内置传送门组件                                                                           |
| `Suspense`                                                                 | 异步组件                                                                              |
| `customRef`                                                                | 自定义Ref                                                                            |
| 函数式组件                                                                      | 可以使用jsx语法                                                                         |
| [`defineCustomElement`](https://www.cnblogs.com/coderDemo/p/16426216.html) | 在`Vue3.2`中使用[`Web Components`](https://www.cnblogs.com/coderDemo/p/16424555.html) |
| ...                                                                        | ...                                                                               |

---
layout: center
class: text-center
---

# Challenges

<br/>

[Vue3.x 挑战合集](https://cn-vuejs-challenges.netlify.app/)

[TypeScript 类型体操](https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md)