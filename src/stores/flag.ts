import { defineStore } from "pinia";
import { ref } from "vue";


export const useFlagStore = defineStore('flag', () => {
    const countDown = ref<number>(3);
    const showCountdown = ref<boolean>(false);

    const displayCountdown = () => {
    const container = document.querySelector("#countdownContainer");
    if (container) {
        // Remove the animation class
        container.classList.remove('countdown');

        // Use a short delay before re-adding the class
        setTimeout(() => {
        container.classList.add('countdown');
        }, 50); // Delay to allow the class removal to take effect
    }
    };

    const startGame = () => {
    showCountdown.value = true;

    setTimeout(() => {
        displayCountdown();
    }, 100); 

    let countdownInterval = setInterval(() => {
        if (countDown.value > 1) {
        displayCountdown();
        countDown.value--;
        } else {
        clearInterval(countdownInterval);
        showCountdown.value = false; 
        countDown.value = 3; 
        }
    }, 1000); 
    };

    return {
        startGame,
        countDown,
        showCountdown
    }
});