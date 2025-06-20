import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { ForecastData } from "../api/types";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";

interface HourlyTemperatureProps {
    data: ForecastData;
}

const HourlyTemperature =({data}: HourlyTemperatureProps) => {

    const chartData = data.list.slice(0,8).map((item) => ({
        time: format(new Date(item.dt * 1000), "ha"),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
    }));
  return( 
    <Card className="flex-1">
        <CardHeader>
            <CardTitle>Today's Temperature</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <XAxis dataKey="time" stroke="#888888" fontSize={12} 
                        tickLine={false} axisLine={false} />  

                        <YAxis stroke="#888888" fontSize={12} 
                        tickLine={false} axisLine={false} 
                        tickFormatter={(value) => `${value}°`}/>

                        <Tooltip content={({active, payload})=> {
                            if(active && payload && payload.length){
                                return(
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex flex-col">
                                                <span className=" text-[0.7rem] uppercase
                                                text-muted-foreground text-orange-500">Temperature</span>
                                                <span className="font-bold">{payload[0].value}°</span>
                                            </div>
                                        
                                            <div className="flex flex-col">
                                                <span className=" text-[0.7rem] uppercase
                                                text-muted-foreground text-green-500">Feels Like</span>
                                                <span className="font-bold">{payload[1].value}°</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return null;
                        }} />

                        <Line type="monotone" dataKey="temp" stroke="#ff7300"
                        strokeWidth={2} dot={false} />

                        <Line type="monotone" dataKey="feels_like" stroke="#387908"
                        strokeWidth={2} dot={false} strokeDasharray="5 5"/>
                    </LineChart>
                </ResponsiveContainer>   
            </div>
        </CardContent>
    </Card>
  )
}  

export default HourlyTemperature