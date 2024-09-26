<script setup lang="ts">
import { useScoreStore } from '@/stores/score';
import { onMounted } from 'vue';

const store = useScoreStore()

onMounted(() => {
    store.getHighScore()
})

</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <p class="pixelify-sans fs-36 text-white">
            Best Score: 
        </p>
        <p class="text-white pixelify-sans">
            🪙 {{ store.highScore }}
        </p>
        <RouterLink :to="{name: 'menu'}" style="margin-top: 100px;">
        <a class="text-white pixelify-sans fs-18">
          📋 Main Menu
        </a>
      </RouterLink>
    </div>
</template>