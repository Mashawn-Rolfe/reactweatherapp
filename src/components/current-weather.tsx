import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { GeocodingData, WeatherData } from "../api/types";
import {Card, CardContent} from "../components/ui/card";

interface CurrentWeatherProps {
  data: WeatherData,
  locationName?: GeocodingData
}

const CurrentWeather= ({data, locationName}: CurrentWeatherProps)=>{
   const {
        weather: [currentWeather],
        main: { temp, feels_like, temp_min, temp_max, humidity },
        wind: { speed} ,
    }=data;

const formatTemperature = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card className="overflow-hidden">
    <CardContent className="p-4">
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-end gap-1">
                        <h2 className="text-2xl font-bold tracking-tighter ">{locationName?.name}</h2>
                        {locationName?.state && (
                            <span className="text-muted-foreground">, 
                            {locationName.state}</span> )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {locationName?.country}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-7xl font-bold tracking-tighter">
                        {formatTemperature(temp)}</p>
                    <div>
                        <p className=" text-sm font-medium text-muted-foreground">
                            Feels Like {formatTemperature(feels_like)}</p>
                        <div className=" text-sm font-medium">
                            <span className="flex items-center gap-1 text-blue-500">
                                <ArrowDown className="h-4 w-4" />
                                {formatTemperature(temp_min)}
                            </span>
                            <span className="flex items-center gap-1 text-red-500">
                                <ArrowUp className="h-4 w-4" />
                                {formatTemperature(temp_max)}
                            </span>
                        </div>
                            
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium">Humidity </p>
                                <p className="text-sm text-muted-foreground">{humidity}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Wind className="h-4 w-4 text-blue-500" />
                        <div className="space-y-0.5">
                            <p className="text-sm font-medium">Wind Speed</p>
                            <p className="text-sm text-muted-foreground">{speed} m/s</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
                        <img src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}></img>
                        <div className="absolute bottom-0 text-center">
                            <p className="text-sm font-medium capitalize">
                                {currentWeather.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    </CardContent>
    </Card>
  )
}

export default CurrentWeather