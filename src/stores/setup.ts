import { defineStore } from "pinia";
import { computed, reactive, ref, watch } from "vue";
import countries from "../../flag.json";

interface Question {
    flagUrl: string,
    country: string
}

export const useSetupStore = defineStore('setup', () => {
    const countDown = ref<number>(3);
    const showCountdown = ref<boolean>(false);
    const showOnGameView = ref<boolean>(false);
    const letter = ref<string>('')
    const textFieldCount = ref<number>(0);
    const willConfigure = ref<boolean>(false)
    const onGameTimer = ref<number>(10);
    const score = ref<number>(0)
    const answer = ref({isCorrect: false, timeGot: 0});
    const question = ref<Question>({
        flagUrl: "https://flagsapi.com/PH/flat/64.png",
        country: "Philippines"
      })

    const displayCountdown = () => {
        showCountdown.value = true;
        setTimeout(() => {
            countDown.value--
        }, 1000)
    };
        
    const startGame = () => {
        let interval = setInterval(() => {
            if (countDown.value > 1) {
                displayCountdown()
            } else {
                clearInterval(interval)
                showCountdown.value = false;
            }
        }, 1000)
    };

    const displayOnGame = () => {
        showOnGameView.value = true;
    }

    const forceTextFieldConfig = () => {
        console.log('called...')
        var fields = document.getElementsByClassName('textField')
        Array.from(fields).forEach(function(field){
            field.addEventListener("keyup", function(event) {
            if (field.value.length == 1 && event.code !== "Backspace") {
                if (field.nextElementSibling) {
                field.nextElementSibling.focus()
                }
            }
        
            if(event.code === "Backspace" && field.value.length == 0) {
                if (field.previousElementSibling) {
                field.previousElementSibling.focus()
                }
            }
            })
        })

        fields[0].focus()

        willConfigure.value = false;
        
    }

    const generateQuestion = () => {
        
        const randomIndex:number = Math.floor(Math.random() * countries.length) + 1;
        const questionToAnswer: Question = {flagUrl: countries[randomIndex].flagUrl, country: countries[randomIndex].country.replace(/\s+/g, '')}

        question.value = questionToAnswer

        console.log('country', questionToAnswer.country)
        
        textFieldCount.value = questionToAnswer.country.length;
    }

    const popQuestion = () => {
        generateQuestion()
        willConfigure.value = true;
    }

    const clearFields = () => {
        var fields = document.getElementsByClassName('textField')
        letter.value = Array.from(fields).map((field: HTMLInputElement) => field.value = "").join('');
    }

    const checkAnswer = (value: string) => {
        if (question.value.country.toLowerCase() == value.toLowerCase()) {
            answer.value = {isCorrect: true, timeGot: onGameTimer.value}
            setupGame()
            incrementScore()
            onGameTimer.value = 10;
        }
    }

    const handleChangeInput = (event:any) => {
        const fields = document.getElementsByClassName('textField');
        letter.value = Array.from(fields).map((field: HTMLInputElement) => field.value).join('');
    }

    const setupGame = () => {
        popQuestion()

        if (willConfigure) {
            clearFields()
            configureTextField()
        }
        
    }

    const configureTextField = () => {
        let interval = setInterval(() => {
            if (willConfigure.value) {
                forceTextFieldConfig()
            } else {
                clearInterval(interval)
            }
        }, 100)
    }

    const runTimer = () => {
        let timer = setInterval(() => {
            onGameTimer.value--;
            if (onGameTimer.value <= 0) {
                clearInterval(timer);
                onGameTimer.value = 0;
            }
        }, 1000)
    }

    const incrementScore = () => {
        if (answer.value.isCorrect && answer.value.timeGot > 5) {
            score.value += 200;
            return;
        } 

        score.value +=100;
    }

    const timer = computed(() => {
        return `${onGameTimer.value}s`
    })
    
    watch(letter, (newVal:string) => {
        checkAnswer(newVal)
    })

    watch(showCountdown, (newVal) => {
        if(!newVal) {
            setupGame()
            runTimer()
        }
    })

    watch(countDown, (newVal) => {
        if (newVal < 1) {
            displayOnGame()
        }
    })

    return {
        /*
            variables
         */
        question,
        textFieldCount,
        timer,
        score,
        /*
            functions
         */
        startGame,
        countDown,
        showCountdown,
        showOnGameView,
        handleChangeInput,
        setupGame,
    }
});