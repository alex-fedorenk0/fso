import axios from 'axios'
import { useState, useEffect } from 'react'

const api_key = process.env.REACT_APP_API_KEY
const base_url = 'http://api.openweathermap.org/data/2.5/weather?q='

export const Weather = ( { city } ) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios
            .get(base_url + city + '&appid=' + api_key)
            .then(response => {setWeather(response.data)})
    }, [city])

    if (weather && weather.main) {
        const temp_C = Math.round((weather.main.temp - 273.15) * 100) / 100
        const icon_url = 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'
        return (
            <div>
                <h2>Weather in {weather.name}</h2>
                <div>temperature {temp_C} Celsius</div>
                <img src={icon_url} alt=""></img>
                <div>wind {weather.wind.speed} m/s</div>
            </div>
        )
    } else {
        return (
            <div>
                Loading weather...
            </div>
        )
    }
}