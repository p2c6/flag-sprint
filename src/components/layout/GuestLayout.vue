<script setup>
import { RouterView } from 'vue-router';


</script>

<template>
    <main class="main">
    <div class="flex flex-col justify-center items-center">
        <div class="flex text-logo pixelify-sans fw-400"> 
            <h1>FlagSprint</h1>
        </div>
    </div>
    <main class="flex flex-col justify-center items-center">
        <RouterView />
    </main>
  </main>
</template>