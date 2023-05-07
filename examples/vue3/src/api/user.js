import axios from '../utils/axios'

export const getWeatherInfo = (token) => {
  return axios.get(`/api/v7/weather/now?location=101010100&key=${token}`)
}

