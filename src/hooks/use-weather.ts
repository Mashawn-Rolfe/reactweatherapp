import { useQuery } from "@tanstack/react-query";
import type { Coordinates } from "../api/types";
import { weatherAPI } from "../api/weather";

export const WEATHER_KEYS ={
    weather: (coord: Coordinates | null) => ["weather", coord] as const,
    forecast: (coord: Coordinates | null) => ["forecast", coord] as const,
    location: (coord: Coordinates | null) => ["location", coord] as const,
    search: (query: string) => ["search", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates|null) {
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates  ?? {lat: 0, lon: 0}),
        queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,
    })
}

export function useForecastQuery(coordinates: Coordinates|null) {
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates  ?? {lat: 0, lon: 0}),
        queryFn: () => coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled: !!coordinates,
    })
}
export function useReverseGeocodeQuery(coordinates: Coordinates|null) {
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates  ?? {lat: 0, lon: 0}),
        queryFn: () => coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
        enabled: !!coordinates,
    })
}
export function useLocationSearch(query: string) {
    return useQuery({
        queryKey: WEATHER_KEYS.search(query),
        queryFn: () => weatherAPI.searchLocation(query),
        enabled: query.length >= 3,
    })
}