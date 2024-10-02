import { defineStore } from "pinia";
import { ref } from "vue";

export const useScoreStore =  defineStore('score', () => {
    const score = ref<number>(0)
    const highScore = ref<number>(0)
    const message = ref<string>("")

    const incrementScore = (answer:any): any => {
        if (answer.isCorrect && answer.timeGot > 5) {
            score.value += 200;
            return;
        } 

        score.value +=100;
    }

    const initHighScore = (): void => {
        if (localStorage.getItem("highScore") === null) {
            localStorage.setItem('highScore', "0");
        }
    }

    const getHighScore = (): number | undefined => {
        const latestHighScore:string | null = localStorage.getItem("highScore");
        let parsedHighScore:number | undefined;

        if (latestHighScore !== null) {
            parsedHighScore =  parseInt(latestHighScore)
            highScore.value = parsedHighScore
        }

        return parsedHighScore;
    }

    const setHighScore = (): void => {
        const latestHighScore = getHighScore()

        if(latestHighScore !== undefined) {
            if (score.value > latestHighScore) {
                highScore.value = score.value;
                localStorage.setItem("highScore", highScore.value.toString())
                message.value = "New Best Score: "
            } else {
                message.value = "Your Score: "
            }
        } else {
            console.log("Error getting latest high score...")
        }
    }

    return {
        score,
        highScore,
        message,
        incrementScore,
        initHighScore,
        setHighScore,
        getHighScore
    }

});