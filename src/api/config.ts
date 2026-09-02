export const API_CONFIG = {
    BASE_URL: 'https://api.openweathermap.org/data/2.5', // OpenWeatherAPI url
    GEO: 'https://api.openweathermap.org/geo/1.0', // OpenWeatherAPI url for geocoding
    API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY, //OpenWeatherAPI key
    default_params: {
        units: 'metric',
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    }
}