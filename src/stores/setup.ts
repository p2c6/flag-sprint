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
    const textFieldCount = ref<number>(0);
    const willConfigure = ref<boolean>(false)
    const answer = ref<number[]>([])
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
        console.log('questionToAnswer', questionToAnswer)

        question.value = questionToAnswer

        console.log('country', questionToAnswer.country)


        console.log('length', questionToAnswer.country.length)

        
        textFieldCount.value = questionToAnswer.country.length;
    }

    const popQuestion = () => {
        generateQuestion()
        willConfigure.value = true;
    }

    const checkInput = (value: string) => {
        if (question.value.country.toLowerCase() == value.toLowerCase()) {
            setupGame()

            var fields = document.getElementsByClassName('textField')
            letter.value = Array.from(fields).map((field: HTMLInputElement) => field.value = "").join('');
        }
    }

    const handleChangeInput = (event:any) => {
        const fields = document.getElementsByClassName('textField');
        letter.value = Array.from(fields).map((field: HTMLInputElement) => field.value).join('');
    }

    const setupGame = () => {
        popQuestion()

        if (willConfigure) {
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

    watch(letter, (newVal:string) => {
        checkInput(newVal)
    })

    watch(showCountdown, (newVal) => {
        if(!newVal) {
            setupGame()
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
        answer,
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