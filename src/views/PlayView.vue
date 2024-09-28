<script setup lang="ts">
import Difficulty from '@/components/Difficulty.vue';
import { useScoreStore } from '@/stores/score';
import { useSetupStore } from '@/stores/setup';
import { onUnmounted, ref, toRef, toRefs } from 'vue';
import Countdown from '@/components/Countdown.vue';
import OnGame from '@/components/OnGame.vue';
import GameOver from '@/components/GameOver.vue';
import FinishGame from '@/components/FinishGame.vue';

const scoreStore = useScoreStore()
const reactiveScoreStore = ref(scoreStore)
const { score, message } = toRefs(reactiveScoreStore.value)

const setupStore = useSetupStore()
const reactiveSetupStore = ref(setupStore)
const {
        showDifficultyView,
        showCountdown,
        startGame,
        countDown,
        showOnGameView,
        countDownMessage,
        isGameOver,
        isGameDefeated,
        question,
        textFieldCount,
        timer,
      } = toRefs(reactiveSetupStore.value)

const { 
        handleClearSetup, 
        handleChangeDifficulty,
        handleChangeInput
      } = setupStore     

onUnmounted(() => {
  handleClearSetup()
})
</script>

<template>
  <div class="flex- flex-col items-center justify-center">

    <Difficulty 
      :showDifficultyView="showDifficultyView" 
      :onClickDifficulty="handleChangeDifficulty"
    />

    <Countdown 
      :showDifficultyView="showDifficultyView"
      :showCountdown="showCountdown"
      :handleStartGame="startGame"
      :countDown="countDown"
      :showOnGameView="showOnGameView"
      :countDownMessage="countDownMessage"
    />

    <OnGame 
      :showCountdown="showCountdown"
      :showOnGameView="showOnGameView"
      :isGameOver="isGameOver"
      :isGameDefeated="isGameDefeated"
      :score="score"
      :flag="question.flagUrl"
      :textFieldCount="textFieldCount"
      :handleChangeInput="handleChangeInput"
      :timer="timer"
    />

    <GameOver 
      :isGameOver="isGameOver"
      :message="message"
      :score="score"
      :handleClearSetup="handleClearSetup"
    />

    <FinishGame 
      :isGameDefeated="isGameDefeated"
      :message="message"
      :score="score"
      :handleClearSetup="handleClearSetup"
    />

  </div>
  
</template>
