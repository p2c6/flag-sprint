<script setup>
import Menu from '@/components/Menu.vue';
import { RouterView } from 'vue-router';


</script>

<template>
    <main class="main">
    <div class="flex flex-col justify-center items-center">
        <div class="flex text-logo pixelify-sans fw-400"> 
            <h1>F</h1>
            <h1>l</h1>
            <h1>a</h1>
            <h1>g</h1>
            <h1>S</h1>
            <h1>p</h1>
            <h1>r</h1>
            <h1>i</h1>
            <h1>n</h1>
            <h1>t</h1>
        </div>
    </div>
    <main class="flex flex-col justify-center items-center">
        <RouterView />
    </main>
  </main>
</template>