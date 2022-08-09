interface DailyForecast {
    datetime: string,
    weather: {
        description: string,
        icon: string,
    }
    temp: number | string,
    temp_min: number | string
}

export default DailyForecast;