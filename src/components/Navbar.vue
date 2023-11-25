<template>
    <nav class="nav">
        <a href="#" class="logo">
            <img src="@assets/images/logo.svg" alt="">
            <span class="logo__span">vue weather</span>
        </a>
        <div class="nav__search">
            <img src="@assets/images/kaplya.svg" alt="">
            <input type="text" class="nav__search-input" placeholder="Выбрать город" v-model="city"
                @keydown.enter="weather.getWeather(city), city = ''">
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useWeather } from '../store';
const weather = useWeather()
let city = ref('')
</script>

<style lang="scss" scoped></style>