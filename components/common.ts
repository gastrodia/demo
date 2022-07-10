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