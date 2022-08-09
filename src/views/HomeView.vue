<template>
  <div class="home">
    <NavBar />
    <DetailsBanner :current-weather="currentWeather"/>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/navigation/NavBar.vue";
import DetailsBanner from "@/components/DetailsBanner.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import CurrentWeather from "@/types/CurrentWeather";
import Forecast from "@/types/Forecast";

const currentWeather = ref<CurrentWeather>({
  city: "",
  date: "",
  description: "",
  feelsLike: "",
  icon: "",
  temperature: "",
  lat: -8.912896,
  lon: 13.2153344
});

// Check if there is already data in localStorage
// if it is true assign to currentWeather 
const weatherStorage = localStorage.getItem("currentWeather")
if(weatherStorage) {
  currentWeather.value = JSON.parse(weatherStorage);
}

onMounted(() => {
  // Grab user geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentWeather.value.lat = position.coords.latitude;
        currentWeather.value.lon = position.coords.longitude;
      },
      () => {
        currentWeather.value.lat = -8.912896;
        currentWeather.value.lon = 13.2153344;
      },
      { maximumAge: 60000 }
    );
  } else {
    alert("Geolocation is not supported by your browser!");
  }
});

const getCurrentWeather = async () => {
  try {
    const res = await axios.get(
      `https://api.weatherbit.io/v2.0/current?lat=${currentWeather.value.lat}&lon=${currentWeather.value.lon}&key=${process.env.VUE_APP_API_KEY}&include=minutely`
    );

    const daily = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${currentWeather.value.lat}&lon=${currentWeather.value.lon}&key=${process.env.VUE_APP_API_KEY}`
    );

    let minutelyForecasts: Forecast[];

    currentWeather.value.city = res.data.data[0].city_name;
    currentWeather.value.date = new Date(res.data.data[0].ob_time).toDateString();
    currentWeather.value.description = res.data.data[0].weather.description;
    currentWeather.value.feelsLike = res.data.data[0].temp;
    currentWeather.value.icon = res.data.data[0].weather.icon + ".png";
    currentWeather.value.temperature = Math.floor(res.data.data[0].temp);
    currentWeather.value.lat = res.data.data[0].lat;
    currentWeather.value.lon = res.data.data[0].lon;

    minutelyForecasts = res.data.minutely;

    localStorage.setItem("currentWeather", JSON.stringify(currentWeather.value));
    localStorage.setItem("minutelyForecasts", JSON.stringify(minutelyForecasts));
    localStorage.setItem("dailyForecasts", JSON.stringify(daily.data.data))
  } catch (error) {
    console.log(error);
  }
};

getCurrentWeather();
</script>
