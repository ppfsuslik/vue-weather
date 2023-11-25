import {
    defineStore
} from "pinia";
import axios from "axios"

export const useWeather = defineStore('weather',{
    state: () => ({
        apiKey: '7a9e3ad4d6c34c0c01cfe1855085867f',
        weather: null,
    }),
    actions: {
        async getWeather(city = 'Ташкент') {
            try {
                let response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${this.apiKey}`)
                console.log(response);
                let {
                    lat,
                    lon,
                    local_names
                } = response.data[0]
                if (local_names.ru.toLowerCase() == city.toLowerCase()) {
                    let response2 = await axios.get(`https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${this.apiKey}&units=metric&lang=ru`)
                    let weatherInfo = {
                        ...response2.data,
                        name: city,
                    }
                    console.log(weatherInfo);
                    this.weather = weatherInfo
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
})