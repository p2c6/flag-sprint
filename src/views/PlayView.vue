<script setup lang="ts">
import Difficulty from '@/components/Difficulty.vue';
import { useScoreStore } from '@/stores/score';
import { useSetupStore } from '@/stores/setup';
import { onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import Countdown from '@/components/Countdown.vue';
import OnGame from '@/components/OnGame.vue';
import GameOver from '@/components/GameOver.vue';
import FinishGame from '@/components/FinishGame.vue';

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

  <FinishGame 
    :isGameDefeated="setupStore.isGameDefeated"
    :message="scoreStore.message"
    :score="scoreStore.score"
    :handleClearSetup="setupStore.handleClearSetup"
  />

</div>
  
</template>
