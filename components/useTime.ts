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