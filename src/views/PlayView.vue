<script setup lang="ts">
import { useFlagStore } from '@/stores/flag';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import countries from "../../flag.json";

const flagStore = useFlagStore()

const letter = ref<string>('')

interface Question {
  flagUrl: string,
  country: string
}

const question = ref<Question>({
  flagUrl: "https://flagsapi.com/PH/flat/64.png",
  country: "Philippines"
})

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

const handleChangeInput = (event:any) => {
    const fields = document.getElementsByClassName('textField');
    letter.value = Array.from(fields).map((field: HTMLInputElement) => field.value).join('');
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

watch(letter, (newVal:string) => {
  checkInput(newVal)
})

onMounted(() => {
  setupTextField()
})

</script>

<template>
  <div id="starting">
    <div class="flex flex-col justify-center items-center" v-if="!flagStore.showCountdown && !flagStore.showOnGameView">
      <div class="start-btn" @click="flagStore.startGame">
        <p class="pixelify-sans">Start</p>
      </div>

      <div class="description text-white mt-1 text-to-center">💭 Guess as many flags as you can to become an ultimate flag master! 👑</div>
    </div>
    <div v-else>
      <div v-if="flagStore.countDown > 0 && !flagStore.showOnGameView" class="pixelify-sans fs-60" id="countdownContainer">{{ flagStore.countDown }}</div>

    </div>
  </div>

  <div id="playing" class="flex flex-col items-center justify-center" v-show="!flagStore.showCountdown && flagStore.showOnGameView">
    <div class="playing-header">
      <div class="flex justify-between items-center">
        <a class="text-light pixelify-sans" href="">⬅️ Back</a>
        <p class="text-light pixelify-sans">🪙 Score: 0</p>
      </div>
    </div>
    <p class="text-white mt-1">Can you guess what flag is this? 🚩</p>

    <div class="flag-container">
      <img :src="question.flagUrl">
    </div>
    <div class="flex" id="textfield-container">
      <input type="text" class="textField" maxlength="1" @input="event => handleChangeInput(event)">
      <input type="text" class="textField" maxlength="1" @input="event => handleChangeInput(event)">
      <input type="text" class="textField" maxlength="1" @input="event => handleChangeInput(event)">
      <input type="text" class="textField" maxlength="1" @input="event => handleChangeInput(event)">
      <input type="text" class="textField" maxlength="1" @input="event => handleChangeInput(event)">
      <input type="text" class="textField" maxlength="1" @input="event => handleChangeInput(event)">
      <input type="text" class="textField" maxlength="1" @input="event => handleChangeInput(event)">
      <input type="text" class="textField" maxlength="1" @input="event => handleChangeInput(event)">
      <input type="text" class="textField" maxlength="1" @input="event => handleChangeInput(event)">
      <input type="text" class="textField" maxlength="1" @input="event => handleChangeInput(event)">
      <input type="text" class="textField" maxlength="1" @input="event => handleChangeInput(event)">
    </div>
    <div class="playing-timer-container">
      <div class="flex flex-end mt-1">
        <div class="playing-timer">
          <p>
            ⏰ 5.2 
          </p>
        </div>
      </div>
    </div>
  </div>

</template>
