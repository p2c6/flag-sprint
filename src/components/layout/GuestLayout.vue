<script setup>
import { RouterView } from 'vue-router';


</script>

<template>
    <main class="main">
    <div class="flex flex-col justify-center items-center">
        <div class="flex items-center justify-center text-logo pixelify-sans fw-400"> 
            <span id="flag">🏳️</span>
            <h1> FlagSprint</h1>
        </div>
    </div>
    <main class="flex flex-col justify-center items-center">
        <RouterView />
    </main>
  </main>
</template>