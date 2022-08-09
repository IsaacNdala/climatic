<template>
  <div v-for="(f, i) in dailyForecastForecasts" :key="i" class="daily-forecast">
    <div class="daily-forecast__temperature">
      <span class="daily-forecast__temperature__date"
        >{{ new Date(f.datetime).toDateString() }}
      </span>
      <span class="daily-forecast__temperature__desc"
        >{{  f.weather.description }}</span
      >
    </div>
    <div class="daily-forecast__description">
      <img width="40" :src="iconURL + f.weather.icon + iconExtension" alt="">
      <h6 class="daily-forecast__description__precip">{{ f.temp }}<sup>ºC</sup></h6>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DailyForecast from "@/types/DailyForecast";

const dailyForecastForecasts = ref<DailyForecast[]>();

const storage = localStorage.getItem("dailyForecasts")

if (storage) {
  dailyForecastForecasts.value = JSON.parse(storage)
}

const iconExtension = '.png'

const iconURL = ref('https://www.weatherbit.io/static/img/icons/');
</script>

<style lang="scss">
.daily-forecast {
  width: 100%;
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d6d6d6;

  .daily-forecast__temperature {
    display: flex;
    flex-direction: column;
    color: #a0a0a0;

    .daily-forecast__temperature__desc {
      color: #263944;
      font-weight: 500;
      font-size: 0.9rem;
    }
  }

  .daily-forecast__description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    i {
      font-size: 1.5rem;
      color: #263944;
    }
    h6 {
      margin-left: 0.2rem;
    }
  }
}
</style>
