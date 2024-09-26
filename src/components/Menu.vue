<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<scrip setup lang="ts">

</scrip>

<template>
        <nav class="mt-1 pixelify-sans">
            <ul>
                <RouterLink to="/play">
                    <li>🎮 PLAY</li>
                </RouterLink>
                <RouterLink :to="{name: 'instruction'}">
                    <li>🗒️ INSTRUCTION</li>
                </RouterLink>
                <RouterLink :to="{name: 'best'}">
                    <li>🔟 BEST SCORE</li>
                </RouterLink>
            </ul>
        </nav>
</template>
