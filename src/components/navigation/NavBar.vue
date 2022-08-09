<template>
  <header class="nav-bar">
    <form @submit.prevent="getCurrentWeatherByCity">
      <input
        type="text"
        class="form-control nav-bar__input-search"
        placeholder="Search for cities"
        v-model="searchInput"
        required
      />
    </form>
    <nav>
      <li>
        <router-link active-class="active" to="/">Today</router-link>
      </li>
      <li>
        <router-link active-class="active" to="/60m-forecast">60 minutes</router-link>
      </li>
      <li>
        <router-link active-class="active" to="/16d-forecast">16 days</router-link>
      </li>
    </nav>
  </header>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import router from "@/router/index";
import Forecast from "@/types/Forecast";

const searchInput = ref("");

// eslint-disable-next-line 
router.beforeEach((to, from) => {
  localStorage.setItem("page", to.name as string)
  return true
})

const pageStorage = localStorage.getItem("page")
let page: string
if(pageStorage) {
  page = pageStorage
}

const getCurrentWeatherByCity = async () => {
  try {
    const res = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${searchInput.value}&key=${process.env.VUE_APP_API_KEY}&include=minutely`);

    const daily = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchInput.value}&key=${process.env.VUE_APP_API_KEY}`
    );

    let minutelyForecasts: Forecast[];

    let currentWeather = {
      city: "",
      date: "",
      description: "",
      feelsLike: "",
      icon: "",
      temperature: 0,
      lat: "",
      lon: ""
    }

    currentWeather.city = res.data.data[0].city_name;
    currentWeather.date = new Date(res.data.data[0].ob_time).toDateString();
    currentWeather.description = res.data.data[0].weather.description;
    currentWeather.feelsLike = res.data.data[0].temp;
    currentWeather.icon = res.data.data[0].weather.icon + ".png";
    currentWeather.temperature = Math.floor(res.data.data[0].temp);
    currentWeather.lat = res.data.data[0].lat;
    currentWeather.lon = res.data.data[0].lon;

    minutelyForecasts = res.data.minutely;

    localStorage.setItem("currentWeather", JSON.stringify(currentWeather));
    localStorage.setItem("minutelyForecasts", JSON.stringify(minutelyForecasts));
    localStorage.setItem("dailyForecasts", JSON.stringify(daily.data.data))
    
    router.push("/")
    if(page === "home") {
      location.reload()
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss">
.nav-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #4787b1;
  width: 100%;
  height: 7rem;
  padding: 1rem 1rem 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 1px 10px -1px rgb(0 0 0 / 25%);
  z-index: 100;

  form {
    width: 100%;
    input {
      background-image: url("@/assets/search.png");
      background-repeat: no-repeat;
      background-position: 1rem 50%;
      background-size: 15px;
      padding: 0.5rem;
      padding-left: 3rem;
      box-shadow: 0 1px 10px -1px rgb(0 0 0 / 25%);

      &:focus {
        border-color: none;
      }
    }
  }

  nav {
    padding: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;

    .active {
      border-bottom: 3px solid white;
    }

    li {
      display: flex;
      height: 100%;
      a {
        display: flex;
        align-items: center;
        height: 100%;
        font-weight: 500;
        color: white;
        border-radius: 0.25rem;
        // border-bottom: 3px solid transparent;
      }
    }
  }
}

@media (min-width: 576px) {
  .nav-bar {
    top: 1rem;
    width: 30rem;
    border-radius: 0.25rem;
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (min-width: 768px) {
  .nav-bar {
    width: 35rem;
  }
}
</style>