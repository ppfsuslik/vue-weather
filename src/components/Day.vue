<template>
    <div class="main__week-day">
        <h2 class="main__week-day-title">{{ getWeekday }}</h2>
        <p class="main__week-day-date">{{ getDay }} {{ getMonth }}</p>
        <div class="main__week-day-img">
            <img :src="getImg" alt="">
        </div>
        <p class="main__week-day-temp">{{ day.temp.max >= 1 ? "+" : "" }}{{ Math.round(day.temp.max) }}°</p>
        <p class="main__week-day-info">{{ description }}</p>
    </div>
</template>

<script setup>
import { unix } from '@/unix'
import {weatherName} from '@/icons.js'
import { useWeather } from '../store';
import { computed } from 'vue'
const props = defineProps({
    day: {
        type: Object
    }
})
const getDay = computed(() => {
    return unix(props.day.dt, 'day')
})
const getMonth = computed(() => {
    return unix(props.day.dt, 'month')
})
const getWeekday = computed(() => {
    return unix(props.day.dt, 'weekday')
})
const description = computed(() => {
    return props.day.weather[0].description
})
const getImg = computed(() => {
    return weatherName[description.value] || weatherName['ясно']
})

</script>

<style lang="scss" scoped></style>