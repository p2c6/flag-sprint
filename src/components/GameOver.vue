<script setup lang="ts">

const props = defineProps<{
    isGameOver: boolean,
    message: string,
    score: number,
    handleClearSetup: () => void
}>()

</script>

<template>
    <div id="game-over" v-show="props.isGameOver">
        <div class="flex flex-col justify-center items-center">
            <p class="text-white pixelify-sans" id="game-over-text">☠️ Game Over</p>
            <p class="text-white pixelify-sans mt-1" id="game-over-message">{{ props.message }}</p>
            <p class="text-white pixelify-sans " id="game-over-score"> 🪙 {{ props.score }}</p>
            <div class="text-white pixelify-sans clickable" id="game-over-play-again" @click="props.handleClearSetup">🕹️Play Again</div>
            <RouterLink :to="{name: 'menu'}" id="game-over-main-menu">
                <a class="text-white pixelify-sans">
                📋 Main Menu
                </a>
            </RouterLink>
        </div>
  </div>
</template>