import { Gauge, Sunrise, Sunset, Wind } from "lucide-react";
import { WeatherData } from "../api/types";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface WeatherDetailsProps {
    data: WeatherData;
}

const WeatherDetails = ({data}: WeatherDetailsProps) => {
    const {wind, main, sys} = data;

    const getWindDirection = (deg: number) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(deg / 45) % 8;
        return directions[index];
    }
    const formatTime = (timestamp: number) => {
        return format(new Date(timestamp * 1000), 'hh:mm a');
    };

    const details=[{
        title: "Sunrise",
        value: formatTime(sys.sunrise),
        icon: Sunrise,
        color: "text-orange-500",
    },
    {
        title: "Sunset",
        value: formatTime(sys.sunset),
        icon: Sunset,
        color: "text-blue-500",
    },
    {
        title: "Wind",
        value: `${getWindDirection(wind.deg)} (${wind.deg}°) at ${wind.speed} m/s`,
        icon: Wind,
        color: "text-green-500",
    },
    {
        title: "Pressure",
        value: `${main.pressure} hPa`,
        icon: Gauge,
        color: "text-purple-700",
    }]
  return (
    <Card>
        <CardHeader>
            <CardTitle>Weather Details</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
                {details.map((detail)=>{
                    return(
                    <div key={detail.title} className="flex items-center gap-3 rounded-lg border
                    p-4">
                        <detail.icon className={`h-5 w-5 ${detail.color}`} />
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{detail.title}</p>
                            <p className="text-sm text-muted-foreground">{detail.value}</p>
                        </div>
                    </div>
                    )
                })}
            </div>
        </CardContent>
    </Card>
  )
}

export default WeatherDetails