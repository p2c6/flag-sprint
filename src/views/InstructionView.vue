<script setup lang="ts">
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <div class="text-white flex flex-col items-center justify-center">
            <p>Guess all the flags within 10s as fast as you can.</p>
            <img
                class="mt-1"
                src="https://flagcdn.com/60x45/ph.png"
                srcset="https://flagcdn.com/120x90/ph.png 2x,
                    https://flagcdn.com/180x135/ph.png 3x"
                width="60"
                height="45"
                alt="Ukraine">
        </div>
        <div class="mt-2 flex flex-col items-center justify-center text-white fs-12">
            <p class="fw-600 fs-18 pixelify-sans">Scoring: </p>
            <ul>
                <li>Correct answer with greater than 5 seconds remaining (+ 🪙 200 score)</li>
                <li>Correct answer with less than or equal to 5 seconds remaining  (+ 🪙 100 score)</li>
            </ul>
        </div>
        <RouterLink :to="{name: 'menu'}" class="mt-2">
        <a class="text-white pixelify-sans fs-18">
          📋 Main Menu
        </a>
      </RouterLink>
    </div>
</template>