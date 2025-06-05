import { format } from "date-fns";
import { ForecastData } from "../api/types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
    data: ForecastData;
}

interface DailyForecast {
    date: number; // Unix timestamp
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: {
        main: string;
        id: number;
        description: string;
        icon: string;
    };
    
}

const WeatherForecast = ({data}: WeatherForecastProps) => {
    const dailyForecast = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

        // Group forecasts by date
        if (!acc[date]) {
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                weather: forecast.weather[0],
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                date: forecast.dt,
            };
        } else{
            // Update existing entry with min/max temperatures
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }
        return acc;
    }, {} as Record<string, DailyForecast>);

    const nextDaysArray = Object.values(dailyForecast).slice(0, 6);

    const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card>
        <CardHeader>
            <CardTitle>5 Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
            <div>
            {nextDaysArray.map((day) => {
                return(
                <div key={day.date} className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4">
                    <div>
                        <p className="font-medium">
                            {format(new Date(day.date * 1000), "EEE, MMM, d")} </p>
                        <p className="text-sm text-muted-foreground capitaize">
                            {day.weather.description} </p>
                    </div>

                    <div>
                        <span className="flex items-center gap-1 text-blue-500">
                                <ArrowDown className="h-4 w-4" />
                                {formatTemp(day.temp_min)}
                            </span>
                            <span className="flex items-center gap-1 text-red-500">
                                <ArrowUp className="h-4 w-4" />
                                {formatTemp(day.temp_max)}
                            </span>
                    </div>

                    <div className="flex justify-end gap-4">
                        <span className="flex items-center gap-2">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">{day.humidity}%</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <Wind className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">{day.wind}m/s</span>                   
                        </span>
                    </div>
                </div>
                )
            })}
            </div>
        
        </CardContent>        
    </Card>
  )
}

export default WeatherForecast