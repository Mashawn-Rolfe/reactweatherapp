import { AlertCircle, MapPin, RefreshCw } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Button } from '../components/ui/button';
import { useGeolocation } from '../hooks/use-geolocation';
import WeatherSkeleton from '../components/loading-skeleton';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '../hooks/use-weather';
import CurrentWeather from '../components/current-weather';
import WeatherDetails from '../components/weather-details';
import WeatherForecast from '../components/weather-forecast';
import HourlyTemperature from '../components/hourly-temperature';



const WeatherDashboard = () => {
  const{coordinates, getLocation, error: locationError, isLoading: locationLoading} = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);



  const handleRefresh = () => {
    getLocation();
    if(coordinates){
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  }

  if(locationLoading){
    return <WeatherSkeleton />
  }

  if(locationError){
  return(
  <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{locationError}</p>
        <Button onClick= {getLocation} variant={"outline"} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
          Retry Location
        </Button>
      </AlertDescription>
    </Alert>)
  }

if(!coordinates){
  return(
  <Alert variant="destructive">
      <AlertTitle>Location Required</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Please enable location access to get the weather in your area.</p>
        <Button onClick= {getLocation} variant={"outline"} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
          Retry Location
        </Button>
      </AlertDescription>
    </Alert>)
  }

  const locationName = locationQuery.data?.[0];

  if(weatherQuery.error || forecastQuery.error){
    return(
      <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Failed to fetch weather data. Please try again.</p>
        <Button onClick= {handleRefresh} variant={"outline"} className="w-fit">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </AlertDescription>
    </Alert>
    )
  }

    if(!weatherQuery.data || !forecastQuery.data){
      return <WeatherSkeleton />
    }


  return (<div className="space-y-4">
    {/* Favorite Cities*/}
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-tight"> My Location</h1>
      <Button variant={"outline"}
        size={"icon"}
        onClick={handleRefresh}
        className="cursor-pointer"
      disabled = {weatherQuery.isFetching || forecastQuery.isFetching}>
        <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? 'animate-spin' : ''}`} />
      </Button>
    </div>

    <div className="grid gap-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <CurrentWeather
          data={weatherQuery.data}
          locationName={locationName}
           />
        <HourlyTemperature
          data = {forecastQuery.data} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 items-start">
        <WeatherDetails data={weatherQuery.data} />
        <WeatherForecast data={forecastQuery.data} />
      </div>
    </div>
  </div>
)
}

export default WeatherDashboard