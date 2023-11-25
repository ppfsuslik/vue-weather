<template>
    <div class="main__content" v-if="weatherInfo">
        <div class="main__content-left">
            <p class="main__content-left-degree">
                {{ Math.floor(weatherInfo.current.temp) }}°
            </p>
            <p class="main__content-left-today">
                Сегодня
            </p>
            <p class="main__content-left-time">
                Время: {{ getTime }}
            </p>
            <p class="main__content-left-city">
                Город: {{ weatherInfo.name.toUpperCase() }}
            </p>
            <div class="main__content-left-img">
                <img :src="getImg" alt="">
            </div>
        </div>
        <div class="main__content-right">
            <img src="@assets/images/headerBg.svg" class="main__content-right-bg" alt="">
            <div class="main__content-right-item">
                <div class="main__content-right-item-img">
                    <img src="@assets/images/temp.svg" alt="">
                </div>
                <span>Температура</span>
                <p>
                    {{ Math.floor(weatherInfo.current.temp) }}° - ощущается как
                    {{ Math.floor(weatherInfo.current.feels_like) }}°
                </p>
            </div>
            <div class="main__content-right-item">
                <div class="main__content-right-item-img">
                    <img src="@assets/images/davlenie.svg" alt="">
                </div>
                <span>Давление </span>
                <p>{{ weatherInfo.current.pressure }} мм ртутного столба </p>
            </div>
            <div class="main__content-right-item">
                <div class="main__content-right-item-img">
                    <img src="@assets/images/osadki.svg" alt="">
                </div>
                <span>Осадки</span>
                <p>{{ weatherInfo.current.clouds }}%</p>
            </div>

            <div class="main__content-right-item">
                <div class="main__content-right-item-img">
                    <img src="@assets/images/wind.svg" alt="">
                </div>
                <span>Ветер</span>
                <p>{{ weatherInfo.current.wind_speed }} м/с {{ windDeg }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { weatherName } from '../icons';
import { useWeather } from '@/store/index.js';
import { computed, onMounted } from 'vue';
const weather = useWeather()
const weatherInfo = computed(() => weather.weather)
const getTime = computed(() => {
    return new Date().toLocaleString('en-US', {
        timeZone: weatherInfo.value.timezone,
        timeStyle: 'short',
        hourCycle: 'h23'
    })
})
const windDeg = computed(() => {
    let winDeg = weatherInfo.value.current.wind_deg
    if (winDeg >= 338 && winDeg <= 359 || winDeg >= 0 && winDeg <= 23) {
        return 'север'
    } else if (winDeg >= 24 && winDeg <= 68) {
        return 'север-восток'
    } else if (winDeg >= 69 && winDeg <= 113) {
        return 'восток'
    } else if (winDeg >= 114 && winDeg <= 158) {
        return 'юг-восток'
    } else if (winDeg >= 159 && winDeg <= 203) {
        return 'юг'
    } else if (winDeg >= 204 && winDeg <= 248) {
        return 'юг-запад'
    } else if (winDeg >= 248 && winDeg <= 293) {
        return 'запад'
    } else if (winDeg >= 293 && winDeg <= 337) {
        return 'cевер-запад'
    }
})
const description = computed(() => {
    return weatherInfo.value.current.weather[0].description
})
onMounted(async () => {
   await weather.getWeather()
})
const getImg = computed(() => {
    return weatherName[description.value] || weatherName['ясно']
})
</script>

<style lang="scss" scoped></style> 