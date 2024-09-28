<script setup lang="ts">
import Difficulty from '@/components/Difficulty.vue';
import { useScoreStore } from '@/stores/score';
import { useSetupStore } from '@/stores/setup';
import { onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import Countdown from '@/components/Countdown.vue';

const setupStore = useSetupStore()
const scoreStore = useScoreStore()

onUnmounted(() => {
  setupStore.handleClearSetup()
})
</script>

<template>
<div class="flex- flex-col items-center justify-center">

  <Difficulty 
    :showDifficultyView="setupStore.showDifficultyView" 
    :onClickDifficulty="setupStore.handleChangeDifficulty"
  />

  <Countdown 
    :showDifficultyView="setupStore.showDifficultyView"
    :showCountdown="setupStore.showCountdown"
    :handleStartGame="setupStore.startGame"
    :countDown="setupStore.countDown"
    :showOnGameView="setupStore.showOnGameView"
    :countDownMessage="setupStore.countDownMessage"
  />

  <div id="playing" class="flex flex-col items-center justify-center" v-show="!setupStore.showCountdown && setupStore.showOnGameView && !setupStore.isGameOver && !setupStore.isGameDefeated">
    <div class="playing-header">
      <div class="flex justify-between items-center">
        <RouterLink :to="{name:'menu'}">
          <a class="text-light pixelify-sans">⬅️ Back</a>
        </RouterLink>
        <p class="text-light pixelify-sans">🪙 Score: {{ scoreStore.score }}</p>
      </div>
    </div>
    <div id="playing-question">
      <p class="text-white mt-1 text-center">Can you guess what flag is this? 🚩</p>
    </div>

    <div class="flag-container">
      <img :src="setupStore.question.flagUrl">
    </div>
    <div class="flex flex-wrap" id="textfield-container">
      <input v-for="field in setupStore.textFieldCount" 
        :key="field"
        type="text" 
        class="textfield" 
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
      <p class="text-white pixelify-sans" id="game-over-text">☠️ Game Over</p>
      <p class="text-white pixelify-sans mt-1" id="game-over-message">{{ scoreStore.message }}</p>
      <p class="text-white pixelify-sans " id="game-over-score"> 🪙 {{ scoreStore.score }}</p>
      <div class="text-white pixelify-sans clickable" id="game-over-play-again" @click="setupStore.handleClearSetup">🕹️Play Again</div>
      <RouterLink :to="{name: 'menu'}" id="game-over-main-menu">
        <a class="text-white pixelify-sans">
          📋 Main Menu
        </a>
      </RouterLink>
    </div>
  </div>

  <div id="finish-game" v-show="setupStore.isGameDefeated">
    <div class="flex flex-col justify-center items-center">
      <p class="text-white pixelify-sans" id="finish-game-text">You're crown as Flag Master! 👑</p>
      <p class="text-white pixelify-sans mt-1" id="finish-game-message">{{ scoreStore.message }}</p>
      <p class="text-white pixelify-sans"  id="finish-game-score"> 🪙 {{ scoreStore.score }}</p>
      <div class="text-white pixelify-sans fs-18 clickable" id="finish-game-play-again" @click="setupStore.handleClearSetup">🕹️ Play Again</div>
      <p class="text-white pixelify-sans fs-12" id="finish-game-share">Share this link with your friends and challenge them!</p>
      <RouterLink :to="{name: 'menu'}" id="finish-game-main-menu">
        <a class="text-white pixelify-sans fs-18">
          📋 Main Menu
        </a>
      </RouterLink>
    </div>
  </div>

</div>
  
</template>
