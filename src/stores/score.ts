import { defineStore } from "pinia";
import { ref } from "vue";

export const useScoreStore =  defineStore('score', () => {
    const score = ref<number>(0)

    const incrementScore = (answer:any): any => {
        if (answer.isCorrect && answer.timeGot > 5) {
            score.value += 200;
            return;
        } 

        score.value +=100;
    }

    return {
        score,
        incrementScore
    }

});