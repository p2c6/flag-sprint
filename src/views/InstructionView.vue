<script setup lang="ts">
</script>

<template>
    <div class="flex flex-col items-center justify-center" id="instruction">
        <div class="text-white flex flex-col items-center justify-center">
            <p id="instruction-description">Guess all the flags within 10s as fast as you can.</p>
            <img
                id="instruction-flag"
                class="mt-1"
                src="https://flagcdn.com/60x45/ph.png"
                srcset="https://flagcdn.com/120x90/ph.png 2x,
                    https://flagcdn.com/180x135/ph.png 3x"
                alt="Ukraine">
        </div>
        <div class="mt-2 flex flex-col items-center justify-center text-white fs-12">
            <p class="fw-600 fs-18 pixelify-sans" id="instruction-scoring-heading">Scoring: </p>
            <ul id="instructiong-score-mechanics">
                <li>Correct answer with greater than 5 seconds remaining (+ 🪙 200 score)</li>
                <li>Correct answer with less than or equal to 5 seconds remaining  (+ 🪙 100 score)</li>
            </ul>
        </div>
        <RouterLink :to="{name: 'menu'}" class="mt-2" id="instruction-main-menu">
        <a class="text-white pixelify-sans fs-18">
          📋 Main Menu
        </a>
      </RouterLink>
    </div>
</template>