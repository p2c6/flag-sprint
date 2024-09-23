import { defineStore } from "pinia";
import { ref, watch } from "vue";


export const useSetupStore = defineStore('setup', () => {
    const countDown = ref<number>(3);
    const showCountdown = ref<boolean>(false);
    const showOnGameView = ref<boolean>(false);

    const displayCountdown = () => {
        showCountdown.value = true;
        setTimeout(() => {
            countDown.value--
        }, 1000)
    };
        
    const startGame = () => {
        let interval = setInterval(() => {
            if (countDown.value > 1) {
                displayCountdown()
            } else {
                clearInterval(interval)
                showCountdown.value = false;
            }
        }, 1000)
    };

    const displayOnGame = () => {
        showOnGameView.value = true;
    }

    watch(countDown, (newVal) => {
        if (newVal < 1) {
            displayOnGame()
        }
    })

    return {
        startGame,
        countDown,
        showCountdown,
        showOnGameView
    }
});