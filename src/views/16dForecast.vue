<template>
  <div class="m-forecast">
    <NavBar />
    <DailyForecast />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/navigation/NavBar.vue";
import DailyForecast from "@/components/DailyForecast.vue";
</script>

<style lang="scss">
.m-forecast {
  width: 100%;
  background-color: white;
  min-height: 100%;
  padding-top: 7rem;
  overflow: auto;
}

@media (min-width: 576px) {
  .m-forecast {
    margin-top: 2rem;
    width: 30rem;
    position: fixed;
    overflow: auto;
    height: 89vh;
    border-radius: 0.25rem;
    box-shadow: 0 1px 10px -1px rgb(0 0 0 / 25%);
  }
}

@media (min-width: 768px) {
  .m-forecast {
    width: 35rem;
  }
}
</style>
