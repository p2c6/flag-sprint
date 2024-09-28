<script setup lang="ts">
interface DifficultyProps {
    showDifficultyView: boolean,
    onClickDifficulty: (difficulty: string) => void;
}

const { 
        showDifficultyView, 
        onClickDifficulty
    } = defineProps<DifficultyProps>();
</script>

<template>
  <div id="difficulty" v-show="showDifficultyView">
    <div class="flex flex-col items-center justify-center pixelify-sans">
      <ul class="text-white fs-24">
        <li @click="onClickDifficulty('easy')">🤠 EASY</li>
        <li  @click="onClickDifficulty('hard')">🥴 HARD</li>
        <li  @click="onClickDifficulty('all')">😎 DEFAULT (All)</li>
      </ul>
    </div>
  </div>
</template>