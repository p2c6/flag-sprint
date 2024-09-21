<script setup lang="ts">
import { useFlagStore } from '@/stores/flag';

const flagStore = useFlagStore()

</script>

<template>
  <div class="mt-1" v-if="!flagStore.showCountdown">
    <div class="start-btn" @click="flagStore.startGame">
      <p class="pixelify-sans">Start</p>
    </div>
  </div>
  <p v-if="!flagStore.showCountdown" class="description text-white mt-1 text-to-center">Guess as many flags as you can to become an ultimate flag master!</p>
  <p v-else class="pixelify-sans fs-60" id="countdownContainer">{{ flagStore.countDown }}</p>
</template>
