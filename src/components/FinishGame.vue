<script setup lang="ts">

const props = defineProps<{
    isGameDefeated: boolean,
    message: string,
    score: number,
    handleClearSetup: () => void
}>()

</script>

<template>
    <div id="finish-game" v-show="props.isGameDefeated">
        <div class="flex flex-col justify-center items-center">
            <p class="text-white pixelify-sans" id="finish-game-text">You're crown as Flag Master! 👑</p>
            <p class="text-white pixelify-sans mt-1" id="finish-game-message">{{ props.message }}</p>
            <p class="text-white pixelify-sans"  id="finish-game-score"> 🪙 {{ props.score }}</p>
            <div class="text-white pixelify-sans fs-18 clickable" id="finish-game-play-again" @click="props.handleClearSetup">🕹️ Play Again</div>
            <p class="text-white pixelify-sans fs-12" id="finish-game-share">Share this link with your friends and challenge them!</p>
            <RouterLink :to="{name: 'menu'}" id="finish-game-main-menu">
                <a class="text-white pixelify-sans fs-18">
                📋 Main Menu
                </a>
            </RouterLink>
        </div>
  </div>
</template>