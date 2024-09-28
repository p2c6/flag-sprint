<script setup lang="ts">

const props = defineProps<{
    showDifficultyView: boolean,
    showCountdown: boolean
    countDown: number,
    showOnGameView: boolean,
    countDownMessage: string,
    handleStartGame: () => void
}>()

</script>

<template>
    <div id="starting" v-show="!props.showDifficultyView">
        <div class="flex flex-col justify-center items-center" v-if="!props.showCountdown && !props.showOnGameView">
            <div class="start-btn" @click="handleStartGame">
                <p class="pixelify-sans">Start</p>
            </div>
            <div class="description text-white mt-1 text-center">
                <p id="starting-description">
                💭 Guess as many flags as you can to become an ultimate flag master! 👑
                </p>
            </div>
        </div>
        <div v-else>
            <div  v-if="props.countDown > 0 && !props.showOnGameView" class="flex flex-col justify-center items-center">
                <div class="pixelify-sans">
                <p id="countdown">{{ countDown }}</p>
                </div>
                <div class="text-light pixelify-sans">
                <p id="countdown-message">{{ props.countDownMessage }}</p>
                </div>
            </div>
        </div>
    </div>
</template>