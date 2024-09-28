<script setup lang="ts">
import { useScoreStore } from '@/stores/score';
import { onMounted, ref, toRefs } from 'vue';

const store = useScoreStore()
const reactiveScoreStore = ref(store)
const { highScore } = toRefs(reactiveScoreStore.value)

const { getHighScore } = store

onMounted(() => {
    getHighScore()
})

</script>

<template>
    <div id="best-score" class="flex flex-col justify-center items-center">
        <p class="pixelify-sans fs-36 text-white" id="heading">
            Best Score: 
        </p>
        <p class="text-white pixelify-sans" id="score">
            🪙 {{ highScore }}
        </p>
        <p id="best-score-description">Play more to beat this current best</p>
        <RouterLink :to="{name: 'menu'}" style="margin-top: 100px;" id="main-menu">
        <a class="text-white pixelify-sans fs-18">
          📋 Main Menu
        </a>
      </RouterLink>
    </div>
</template>