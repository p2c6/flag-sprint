<script setup lang="ts">
import { useFlagStore } from '@/stores/flag';

const flagStore = useFlagStore()

</script>

<template>
  <div id="starting">
    <div class="flex flex-col justify-center items-center" v-if="!flagStore.showCountdown && !flagStore.showOnGameView">
      <div class="start-btn" @click="flagStore.startGame">
        <p class="pixelify-sans">Start</p>
      </div>

      <div class="description text-white mt-1 text-to-center">Guess as many flags as you can to become an ultimate flag master!</div>
    </div>
    <div v-else>
      <div v-if="flagStore.countDown > 0 && !flagStore.showOnGameView" class="pixelify-sans fs-60" id="countdownContainer">{{ flagStore.countDown }}</div>

    </div>
  </div>


  <div id="playing" class="flex flex-col items-center justify-center" v-show="!flagStore.showCountdown && flagStore.showOnGameView">
    <div style="width: 120%; margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <a class="text-light pixelify-sans" href="">⬅️ Back</a>
        <p class="text-light pixelify-sans">🪙 Score: 0</p>
      </div>
    </div>
    <p class="text-white mt-1">Can you guess what flag is this? 🚩</p>

    <div class="flag-container">
      <img src="https://flagsapi.com/PH/flat/64.png" alt="">
    </div>
    <div class="flex">
      <input type="text" class="textField">
      <input type="text" class="textField">
      <input type="text" class="textField">
      <input type="text" class="textField">
      <input type="text" class="textField">
      <input type="text" class="textField">
      <input type="text" class="textField">
      <input type="text" class="textField">
    </div>
    <div style="width: 98%;">
      <div class="flex flex-end mt-1">
        <div class="playingTimer">
          <p>
            5.2
          </p>
        </div>
      </div>
    </div>
  </div>

</template>
