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

export default CurrentWeather
