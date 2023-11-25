<template>
  <div class="container" v-if="weather">
    <Navbar />
    <Main />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Main from '@/components/Main.vue';
import { computed, onMounted } from 'vue'
import { useWeather } from './store/index.js'
const weather = useWeather()
const weatherInfo = computed(() => weather.weather)
onMounted(() => {
  weather.getWeather()
})


</script>

<style lang="scss" scoped></style>