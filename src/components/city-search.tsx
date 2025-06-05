import { useState } from "react";
import { Button } from "./ui/button"
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "./ui/command";
import { Clock, Loader2, Search, XCircle } from "lucide-react";
import { useLocationSearch } from "../hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "../hooks/use-search-history";
import { format } from "date-fns";


const CitySearch = () =>{
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    // This hook fetches city data based on the search query
    const {data: location, isLoading} = useLocationSearch(query);
    const {history, addToHistory, clearHistory} = useSearchHistory();

    const handleSelect=(cityData: string) =>{
        const [lat, lon, name, country] = cityData.split("|");

        // Adds the selected city to search history
        addToHistory.mutate({
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            name,
            country,
            query,
        });

        setOpen(false);
        navigate(`city/${name}?lat=${lat}&lon=${lon}`);
    };

    
    // This component is a search bar for cities, which opens a command dialog
  return (
    <>
    <Button variant="outline" className="w-full justify-start text-sm text-muted-foreground 
        sm:pr-12 md:w-40 lg:w-64"
        onClick={()=> setOpen(true)}>
        <Search className="mr-2 h-4 w-4" />
            Search Cities...
    </Button>
        
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search cities..." 
            value={query}
            onValueChange={setQuery}
            />
            <CommandList>
                {query.length>2 && !isLoading && (
                    <CommandEmpty>No results found.</CommandEmpty>
                )}
                {/*<CommandGroup heading="Favorite Cities">
                    <CommandItem>Calendar</CommandItem>
                </CommandGroup>*/}

                {history.length>0 && (
                    <>
                    <CommandSeparator />
                    <CommandGroup>
                        <div className="flex items-center justify-between px-4 my-2">
                            <p className="text-xs text-muted-foreground">Recent Searches</p>
                            <Button variant="ghost" size="sm" onClick={()=> clearHistory.mutate()}>
                                <XCircle className="h-4 w-4" />
                                Clear History
                            </Button>
                        </div>
                        {history.map((location) => {
                            return (
                            <CommandItem key={`${location.lat}-${location.lon}`}
                                value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                onSelect={handleSelect}>
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{location.name}</span>
                                {location.state &&(
                                    <span className="text-sm text-muted-foreground">
                                        , {location.state}
                                    </span>
                            )}
                                <span className="text-sm text-muted-foreground">
                                    , {location.country}
                                </span>
                                <span className="ml-auto text-xs text-muted-foreground">
                                    {format(location.searchedAt, 'MMM d, h:mm a')}
                                </span>
                            </CommandItem>
                            )
                        })}
                    </CommandGroup>
                    </>
                )}

                <CommandSeparator />

                {location && location.length>0 &&(
                <CommandGroup heading="Suggested Cities">
                    {isLoading && (
                        <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                    )}
                    {location.map((location) => {
                        return (<CommandItem key={`${location.lat}-${location.lon}`}
                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                        onSelect={handleSelect}>
                            <Search className="mr-2 h-4 w-4" />
                            <span>{location.name}</span>
                            {location.state &&(
                                <span className="text-sm text-muted-foreground">
                                    , {location.state}
                                </span>
                            )}
                                <span className="text-sm text-muted-foreground">
                                    , {location.country}
                                </span>
                            </CommandItem>
                        )
                    })}
                </CommandGroup>
                )}
            </CommandList>
        </CommandDialog>
    </>
  )
}

export default CitySearch