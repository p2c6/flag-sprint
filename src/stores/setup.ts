import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import countries from "../../countries.json";
import { useScoreStore } from "./score";

interface Question {
    flagUrl: string,
    country: string,
    indexLocatedAt: number | null
}

interface Country {
    name: string,
    code2: string,
    code3: string
};

interface Answer {
    isCorrect: boolean,
    timeGot: number
}

enum CountDownMessage {
    Ready = "👌 Ready",
    Set = "✌️ Set",
    Go = "☝️ Go!",
}

export const useSetupStore = defineStore('setup', () => {
    const scoreStore = useScoreStore();
    const countDown = ref<number>(3);
    const showCountdown = ref<boolean>(false);
    const showOnGameView = ref<boolean>(false);
    const letter = ref<string>('')
    const textFieldCount = ref<number>(0);
    const willConfigure = ref<boolean>(false)
    const onGameTimer = ref<number>(10);
    const answer = ref<Answer>({isCorrect: false, timeGot: 0});
    const isGameOver = ref<boolean>(false);
    const myTimer = ref();
    const allCountries =ref<Country[]>(countries);
    const completeCountries = ref<Country[]>([...countries]);
    const isGameDefeated = ref<boolean>(false);
    const difficulty = ref<string>("");
    const showDifficultyView = ref<boolean>(true);

    const countDownMessageList = <string[]>[
        CountDownMessage.Ready, 
        CountDownMessage.Set, 
        CountDownMessage.Go,
    ];

    const countDownMessage = ref<string>("");

    const question = ref<Question>({
        flagUrl: "",
        country: "",
        indexLocatedAt: null
    })

    const displayCountdown = (): void => {
        showCountdown.value = true;
        setTimeout(() => {
            countDown.value--
        }, 1000)
    };
        
    const startGame = (): void => {
        let counter = 0;
        scoreStore.score = 0;
        let interval = setInterval(() => {
            if (countDown.value > 1) {
                displayCountdown()
                countDownMessage.value = countDownMessageList[counter]
                counter++;
            } else {
                clearInterval(interval)
                showCountdown.value = false;
            }
        }, 1000)
    };

    const displayOnGame = (): void => {
        showOnGameView.value = true;
    }

    const forceTextFieldConfig = (): void => {
        var fields = document.getElementsByClassName('textField');
        
        Array.from(fields).forEach(function(field) {
            field.addEventListener("input", function(event) {
                if (field.value.length == 1 && event.inputType !== "deleteContentBackward") {
                    if (field.nextElementSibling) {
                        field.nextElementSibling.focus();
                    }
                }
            });
            
            field.addEventListener("keydown", function(event) {
                if (event.code === "Backspace" && field.value.length == 0) {
                    if (field.previousElementSibling) {
                        field.previousElementSibling.focus();
                    }
                }
            });
        });
        
        fields[0].focus();
        willConfigure.value = false;
    };

    const getFlagUrl = (code:string):string => {
        return `https://flagcdn.com/60x45/${code}.png`
    }

    const generateQuestion = () :void => {
        const randomIndex:number = Math.floor(Math.random() * allCountries.value.length);
        const country = allCountries.value[randomIndex];
        

        const questionToAnswer: Question = {
            flagUrl: getFlagUrl(country.code2.toLowerCase()), 
            country: country.name.replace(/\s+/g, ''), 
            indexLocatedAt: randomIndex
        }

        question.value = questionToAnswer


        console.log('country', questionToAnswer.country)
        
        textFieldCount.value = questionToAnswer.country.length;
    }

    const popQuestion = (): void => {
        generateQuestion()
        willConfigure.value = true;
    }

    const clearFields = (): void => {
        var fields = document.getElementsByClassName('textField')
        letter.value = Array.from(fields).map((field: HTMLInputElement) => field.value = "").join('');
    }

    const removeToCountryList = (index: any):void => {
        allCountries.value.splice(index, 1);
    }

    const checkAnswer = (value: string): void => {
        if (question.value.country.toLowerCase() == value.toLowerCase()) {
            removeToCountryList(question.value.indexLocatedAt)

            answer.value = {isCorrect: true, timeGot: onGameTimer.value}

            onGameTimer.value = 10;

            scoreStore.incrementScore(answer.value)

            if (allCountries.value.length == 0 ) {
                isGameDefeated.value = true;
                stopTimer()
                return;
            }

            setupGame()
        }
    }

    const resetCountryList = (): void => {
        allCountries.value = [...completeCountries.value];
    };

    const handleChangeInput = (event:any): void => {
        const fields = document.getElementsByClassName('textField');
        letter.value = Array.from(fields).map((field: HTMLInputElement) => field.value).join('');
    }

    const setupGame = (): void => {
        scoreStore.initHighScore()
        
        popQuestion()

        if (willConfigure) {
            clearFields()
            configureTextField()
        }
        
    }

    const configureTextField = () :void => {
        let interval = setInterval(() => {
            if (willConfigure.value) {
                forceTextFieldConfig()
            } else {
                clearInterval(interval)
            }
        }, 100)
    }

    const runTimer = (): void => {
        myTimer.value = setInterval(() => {
            onGameTimer.value--;
            if (onGameTimer.value <= 0) {
                clearInterval(myTimer.value);
                onGameTimer.value = 0;
            }
        }, 1000)
    }

    const stopTimer = (): void => {
        if(myTimer.value) {
            clearInterval(myTimer.value)
        }
    }

    const gameDifficulty = (mode:string):void => {
        console.log('triggere...', mode)
        switch (mode) {
            case "easy":
                allCountries.value = allCountries.value.filter(country => country.name.length <= 7)
                break;
            case "hard": 
                allCountries.value = allCountries.value.filter(country => country.name.length >= 8)
                break;
            case "all":
                allCountries.value = <Country[]>countries
                break;
        }
    }

    const timer = computed((): string => {
        return `${onGameTimer.value}s`
    })

    const gameOver = (): void => {
        scoreStore.setHighScore()
        isGameOver.value = true;
        stopTimer()
    }

    const handleChangeDifficulty = (selectedDifficulty:string) => {
        difficulty.value = selectedDifficulty
        showDifficultyView.value = false
    }

    const handleClearSetup = (): void => {
        showCountdown.value = false;
        showOnGameView.value = false;
        countDown.value = 3;
        onGameTimer.value = 10;
        isGameOver.value = false;
        isGameDefeated.value = false;
        showDifficultyView.value = true;
        difficulty.value = "";
        stopTimer()
        resetCountryList()
    }

    watch(difficulty, (newVal) => {
        gameDifficulty(newVal);
    })

    watch(onGameTimer, (newVal:number) => {
        if(newVal  < 1) {
            gameOver()
        }
    })
    
    watch(letter, (newVal:string) => {
        checkAnswer(newVal)
    })

    watch(showCountdown, (newVal:boolean) => {
        if(!newVal) {
            setupGame()
            runTimer()
        }
    })

    watch(countDown, (newVal:number) => {
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
        isGameOver,
        onGameTimer,
        isGameDefeated,
        difficulty,
        countDownMessage,
        /*
            functions
         */
        startGame,
        countDown,
        showCountdown,
        showOnGameView,
        handleChangeInput,
        setupGame,
        handleClearSetup,
        handleChangeDifficulty,
        showDifficultyView
    }
});