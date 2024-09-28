<script setup lang="ts">
const props = defineProps<{
    showCountdown: boolean,
    showOnGameView: boolean,
    isGameOver: boolean,
    isGameDefeated: boolean,
    score: number,
    flag: string,
    textFieldCount: number,
    handleChangeInput: (event: Event) => void,
    timer: string,
}>()
</script>

<template>
    <div id="playing" class="flex flex-col items-center justify-center" v-show="!props.showCountdown && props.showOnGameView && !props.isGameOver && !props.isGameDefeated">
        <div class="playing-header">
            <div class="flex justify-between items-center">
                <RouterLink :to="{name:'menu'}">
                <a class="text-light pixelify-sans">⬅️ Back</a>
                </RouterLink>
                <p class="text-light pixelify-sans">🪙 Score: {{ props.score }}</p>
            </div>
        </div>
        <div id="playing-question">
            <p class="text-white mt-1 text-center">Can you guess what flag is this? 🚩</p>
        </div>
        <div class="flag-container">
            <img :src="props.flag">
        </div>
        <div class="flex flex-wrap" id="textfield-container">
            <input v-for="field in props.textFieldCount" 
                :key="field"
                type="text" 
                class="textfield" 
                maxlength="1" 
                @input="event => props.handleChangeInput(event)"
            >
        </div>
        <div class="playing-timer-container">
            <div class="flex flex-end mt-1">
                <div class="playing-timer">
                <p>
                    ⏰ {{ props.timer }}
                </p>
                </div>
            </div>
        </div>
    </div>
</template>