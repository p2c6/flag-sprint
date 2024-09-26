<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<scrip setup lang="ts">

</scrip>

<template>
        <nav class="mr-100 mt-1 fs-mobile pixelify-sans">
            <ul>
                <RouterLink to="/play">
                    <li>PLAY</li>
                </RouterLink>
                <li>INSTRUCTION</li>
                <RouterLink :to="{name: 'best'}">
                    <li>BEST SCORE</li>
                </RouterLink>
            </ul>
        </nav>
</template>
