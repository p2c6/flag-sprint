<script setup lang="ts">
import { useSetupStore } from '@/stores/setup';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const setupStore = useSetupStore()
</script>

<template>
  <div id="starting">
    <div class="flex flex-col justify-center items-center" v-if="!setupStore.showCountdown && !setupStore.showOnGameView">
      <div class="start-btn" @click="setupStore.startGame">
        <p class="pixelify-sans">Start</p>
      </div>

      <div class="description text-white mt-1 text-to-center">💭 Guess as many flags as you can to become an ultimate flag master! 👑</div>
    </div>
    <div v-else>
      <div v-if="setupStore.countDown > 0 && !setupStore.showOnGameView" class="pixelify-sans fs-60" id="countdownContainer">{{ setupStore.countDown }}</div>

    </div>
  </div>

  <div id="playing" class="flex flex-col items-center justify-center" v-show="!setupStore.showCountdown && setupStore.showOnGameView && !setupStore.isGameOver">
    <div class="playing-header">
      <div class="flex justify-between items-center">
        <RouterLink :to="{name:'menu'}">
          <a class="text-light pixelify-sans">⬅️ Back</a>
        </RouterLink>
        <p class="text-light pixelify-sans">🪙 Score: {{ setupStore.score }}</p>
      </div>
    </div>
    <p class="text-white mt-1">Can you guess what flag is this? 🚩</p>

    <div class="flag-container">
      <img :src="setupStore.question.flagUrl">
    </div>
    <div class="flex" id="textfield-container">
      <input v-for="field in setupStore.textFieldCount" 
        :key="field"
        type="text" 
        class="textField" 
        maxlength="1" 
        @input="event => setupStore.handleChangeInput(event)"
      >
    </div>
    <div class="playing-timer-container">
      <div class="flex flex-end mt-1">
        <div class="playing-timer">
          <p>
            ⏰ {{ setupStore.timer }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div id="game-over" v-show="setupStore.isGameOver">
    <div class="flex flex-col justify-center items-center">
      <p class="text-white pixelify-sans fs-36">☠️ Game Over</p>
      <p class="text-white pixelify-sans fs-18"> Your score:</p>
      <p class="text-white pixelify-sans fs-18"> 🪙 {{ setupStore.score }}</p>
      <div class="text-white pixelify-sans fs-18 mt-1 clickable" @click="setupStore.handlePlayAgain">🕹️ Play Again</div>
    </div>
  </div>

</template>
