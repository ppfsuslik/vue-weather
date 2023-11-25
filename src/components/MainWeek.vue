<template>
    <div class="main__week" v-if="weatherInfo">
        <Day v-for="(day, i) in weatherInfo.daily" :key="i" :day="day" />
    </div>
</template>

<script setup>

import Day from './Day.vue';
import { computed, onMounted } from 'vue'
import { useWeather } from '../store';
const weather = useWeather()
const weatherInfo = computed(() => weather.weather)
onMounted(() => {
    weather.getWeather()
})
</script>