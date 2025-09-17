import DrizzleIcon from './icons/drizzle.svg';
import RainIcon from './icons/rain.svg';
import SnowIcon from './icons/snow.svg';
import OvercastIcon from './icons/overcast.svg';
import SunriseIcon from './icons/sunrise.svg';
import SunsetIcon from './icons/sunset.svg';
import FogIcon from './icons/fog.svg';
import MistIcon from './icons/mist.svg';
import HazeIcon from './icons/haze.svg';
import CloudyIcon from './icons/cloudy.svg';
import ClearIcon from './icons/clear-day.svg';

export function getPrecipitation(data) {
        if (data.rain > 0)
            return {img: RainIcon, data: data.rain + " mm"};
        if (data.snow > 0)
            return {img: SnowIcon, data: data.snow + " cm"};
        if (data.showers)
            return {img: DrizzleIcon, data: data.showers + " mm"};
        return {img: OvercastIcon, data: "0 mm"};
    }


export function getSunsetRise(data) {

    let sunrise = data.sunrise.split('T')[1];
    let sunset = data.sunset.split('T')[1];

    let now = new Date();
    let currentMinutes = now.getHours() * 60 + now.getMinutes();

    const toMinutes = (timeStr) => {
        let [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
    };

    let sunriseMinutes = toMinutes(sunrise);

        if (currentMinutes <= sunriseMinutes) {
            return { img: SunriseIcon, main: sunrise, second: sunset };
        } else {
            return { img: SunsetIcon, main: sunset, second: sunrise };
        }
    }


export function getVisibilityIcon(data) {
    // Fog:     0 – 100 m
    // Mist:    101 – 1000 m
    // Haze:    1001 – 3000 m
    // Cloudy:  3001 – 5000 m
    // Clear:   5001+ m
    
    if (data.min_visibility <= 100) 
    {
        return FogIcon;
    } 
    else if (data.min_visibility <= 1000) 
    {
        return MistIcon;
    } 
    else if (data.min_visibility <= 3000) 
    {
        return HazeIcon;
    } 
    else if (data.min_visibility <= 5000) 
    {
        return CloudyIcon;
    } 
    else {
        return ClearIcon;
    };
}