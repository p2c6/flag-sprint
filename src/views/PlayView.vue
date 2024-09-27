<script setup lang="ts">
import { useScoreStore } from '@/stores/score';
import { useSetupStore } from '@/stores/setup';
import { onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

const setupStore = useSetupStore()
const scoreStore = useScoreStore()

onUnmounted(() => {
  setupStore.handleClearSetup()
})
</script>

<template>
<div class="flex- flex-col items-center justify-center">

  <div id="difficulty" v-show="setupStore.showDifficultyView">
    <div class="flex flex-col items-center justify-center pixelify-sans">
      <ul class="text-white fs-24">
        <li @click="setupStore.handleChangeDifficulty('easy')">🤠 EASY</li>
        <li  @click="setupStore.handleChangeDifficulty('hard')">🥴 HARD</li>
        <li  @click="setupStore.handleChangeDifficulty('all')">😎 DEFAULT (All)</li>
      </ul>
    </div>
  </div>

  <div id="starting" v-show="!setupStore.showDifficultyView">
    <div class="flex flex-col justify-center items-center" v-if="!setupStore.showCountdown && !setupStore.showOnGameView">
      <div class="start-btn" @click="setupStore.startGame">
        <p class="pixelify-sans">Start</p>
      </div>
      <div class="description text-white mt-1 text-center">
        <p>
          💭 Guess as many flags as you can to become an ultimate flag master! 👑
        </p>
      </div>
    </div>
    <div v-else>
      <div  v-if="setupStore.countDown > 0 && !setupStore.showOnGameView" class="flex flex-col justify-center items-center">
        <div class="pixelify-sans">
          <p id="countdown">{{ setupStore.countDown }}</p>
        </div>
        <div class="text-light pixelify-sans">
          <p id="countdown-message">{{ setupStore.countDownMessage }}</p>
        </div>
      </div>
    </div>
  </div>

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
