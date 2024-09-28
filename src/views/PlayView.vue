<script setup lang="ts">
import Difficulty from '@/components/Difficulty.vue';
import { useScoreStore } from '@/stores/score';
import { useSetupStore } from '@/stores/setup';
import { onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import Countdown from '@/components/Countdown.vue';
import OnGame from '@/components/OnGame.vue';
import GameOver from '@/components/GameOver.vue';

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

  <OnGame 
    :showCountdown="setupStore.showCountdown"
    :showOnGameView="setupStore.showOnGameView"
    :isGameOver="setupStore.isGameOver"
    :isGameDefeated="setupStore.isGameDefeated"
    :score="scoreStore.score"
    :flag="setupStore.question.flagUrl"
    :textFieldCount="setupStore.textFieldCount"
    :handleChangeInput="setupStore.handleChangeInput"
    :timer="setupStore.timer"
  />

  <GameOver 
    :isGameOver="setupStore.isGameOver"
    :message="scoreStore.message"
    :score="scoreStore.score"
    :handleClearSetup="setupStore.handleClearSetup"
  />

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
