<template>
  <div v-for="(f, i) in minutelyForecasts" :key="i" class="forecast-component">
    <div class="forecast-component__temperature">
      <span class="forecast-component__temperature__date"
        ><i class="fi fi-rr-time-oclock"></i>
      </span>
      <span class="forecast-component__temperature__desc"
        >{{ new Date(f.timestamp_local).getHours() }}:{{
          new Date(f.timestamp_local).getMinutes()
        }}</span
      >
    </div>
    <div class="forecast-component__description">
      <i class="fi fi-rr-thermometer-half"></i>
      <h6 class="forecast-component__description__precip">{{ f.temp }}<sup>ºC</sup></h6>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Forecast from "@/types/Forecast";

const minutelyForecasts = ref<Forecast[]>();

const storage = localStorage.getItem("minutelyForecasts");
if (storage) {
  minutelyForecasts.value =  JSON.parse(storage);
}
</script>

<style lang="scss">
.forecast-component {
  width: 100%;
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d6d6d6;

  .forecast-component__temperature {
    display: flex;
    flex-direction: column;
    color: #a0a0a0;
    align-items: center;
    font-size: 1.5rem;

    .forecast-component__temperature__desc {
      color: #263944;
      font-weight: 500;
      font-size: 0.9rem;
    }
  }

  .forecast-component__description {
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
