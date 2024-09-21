<script setup lang="ts">
import logo from "@/assets/images/flagsprint.png"
import Menu from "@/components/Menu.vue";
</script>

<template>
  <main>
    <div class="flex items-center flex-col justify-center">
      <img :src="logo" alt="" width="200" height="80">
      <!-- <p style="font-size:18px;">Can you guess what flag is this? 🚩</p> -->
       <Menu />
    </div>
  </main>
</template>
