import { defineStore } from "pinia";
import { ref, watch } from "vue";
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

    const setupTextField = () => {
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
    }

    const generateQuestion = () => {
  
        const randomIndex:number = Math.floor(Math.random() * countries.length) + 1;
        const questionToAnswer = countries[randomIndex];
      
        question.value = {flagUrl: questionToAnswer.flagUrl, country: questionToAnswer.country};
    }

    const nextQuestion = () => generateQuestion();

    const checkInput = (value: string) => {
        if (question.value.country.toLowerCase() == value.toLowerCase()) {
            nextQuestion()
        }
    }

    const handleChangeInput = (event:any) => {
        const fields = document.getElementsByClassName('textField');
        letter.value = Array.from(fields).map((field: HTMLInputElement) => field.value).join('');
    }

    watch(letter, (newVal:string) => {
        checkInput(newVal)
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
        /*
            functions
         */
        startGame,
        countDown,
        showCountdown,
        showOnGameView,
        setupTextField,
        handleChangeInput
    }
});