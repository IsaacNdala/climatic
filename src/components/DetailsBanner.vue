<template>
    <div class="details-banner">
        <h2 class="text-center details-banner__loader" v-if="!currentWeather.city">Loading...</h2>
        <div class="details-banner__temperature">
            <h5 class="details-banner__temperature__city">{{ currentWeather.city }}</h5>
            <h6 class="details-banner__temperature__date">{{ currentWeather.date }}</h6>
            <h1 class="details-banner__temperature__tmp">{{ currentWeather.temperature }}<sup v-if="currentWeather.temperature">ºC</sup></h1>
            <h6 v-if="currentWeather.temperature" class="details-banner__temperature__date">Feels like {{ currentWeather.temperature }}<sup>º</sup></h6>
        </div>
        <div v-if="currentWeather.description" class="details-banner__description">
            <img :src="iconURL + currentWeather.icon" alt="" srcset="">
            <h6>{{ currentWeather.description }}</h6>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

interface CurrentWeather {
  city: string
  date: string
  description: string
  feelsLike: string
  icon: string
  temperature: string | number,
  lat: string | number,
  lon: string | number
}

defineProps<{
    currentWeather: CurrentWeather
}>()

const iconURL = ref('https://www.weatherbit.io/static/img/icons/')
</script>


<style lang="scss">
.details-banner {
    position: relative;
    width: 100vw;
    padding: 1rem 1.2rem;
    padding-top: 10rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    min-height: 50%;

    .details-banner__loader {
        margin-top: 5rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .details-banner__loader,
    .details-banner__temperature__tmp,
    .details-banner__temperature__date,
    .details-banner__temperature__description h {
        color: white;
        text-shadow: 2px 2px 5px rgb(0 0 0 / 25%);
    }

    .details-banner__temperature {
        .details-banner__temperature__city {
            color: #263944;
            font-weight: 500;
        }

        h1 {
            font-size: 5rem;
            sup {
                font-size: 3rem;
            }
        }
    }

    .details-banner__description {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        text-shadow: 2px 2px 5px rgb(0 0 0 / 25%);
    }
}

@media (min-width: 576px) {
    .details-banner {
        width: 30rem;
    }
}

@media (min-width: 768px) {
    .details-banner {
        width: 35rem;
    }
}
</style>