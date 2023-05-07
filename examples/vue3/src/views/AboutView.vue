<script setup>
import { ref } from 'vue'
import { dateHandler } from 'common-toolbox'
import { getWeatherInfo } from '../api/user'

const dateObj = ref(dateHandler.getDateAndWeek())

const userInfo = ref(null)

const query = async (token) => {
  const res = await getWeatherInfo(token)
  console.log('res: ', res)
  userInfo.value = JSON.stringify(res)
}

query('53be61509c5b430b845a6afa2a2d4813')

</script>

<template>
  <div class="about">
    <div>
      <div>{{ dateObj.date }}, {{ dateObj.time }}, {{ dateObj.week }}</div>
      <div>{{ JSON.parse(userInfo) }}</div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    padding: 50px;
  }
}
</style>
