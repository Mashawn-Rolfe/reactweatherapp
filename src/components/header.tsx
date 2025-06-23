import {Link} from 'react-router-dom';
import {useTheme} from '../context/theme-provider';
import { Moon, Sun, Home } from 'lucide-react';
import CitySearch from './city-search';

const Header = () => {
    const {theme, setTheme} = useTheme();
    const isDark = theme ==="dark";

  return (
   <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-1
    supports-[backdrop-filter]:bg-background/80">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
         <Link to={"/"}>
          <Home className="h-14"
          />
        </Link>
        
        {/* search */}
        <CitySearch />
        
        {/*theme toggle*/}
    <div onClick={() => setTheme(isDark? "light":"dark")}
        className={`flex items-center cursor-pointer transition-transform duration-300
        ${isDark ? "rotate-0" : "rotate-180"}
        `}>
        {isDark?(
          <Moon className="h-6 w-6 cursor-pointer text-white-500" /> 
        ):( <Sun className="h-6 w-6 cursor-pointer text-yellow-500" />)}
    </div>
    </div>
  </header>
  )
}

export default Header