<script setup lang="ts">
import { ref } from 'vue';

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
</script>

<template>
  <div class="mt-1" v-if="!showCountdown">
    <div class="start-btn">
      <p class="pixelify-sans" @click="startGame">Start</p>
    </div>
  </div>
  <p v-if="!showCountdown" class="description text-white mt-1 text-to-center">Guess as many flags as you can to become an ultimate flag master!</p>
  <p v-else class="pixelify-sans fs-60" id="countdownContainer">{{ countDown }}</p>
</template>
