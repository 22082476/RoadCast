import DrizzleIcon from './icons/drizzle.svg';
import RainIcon from './icons/rain.svg';
import SnowIcon from './icons/snow.svg';
import SleetIcon from './icons/sleet.svg';
import OvercastIcon from './icons/overcast.svg';
import SunriseIcon from './icons/sunrise.svg';
import SunsetIcon from './icons/sunset.svg';
import FogIcon from './icons/fog.svg';
import MistIcon from './icons/mist.svg';
import HazeIcon from './icons/haze.svg';
import CloudyIcon from './icons/cloudy.svg';
import ClearIcon from './icons/clear-day.svg';

export function getPrecipitation(data) {
        if (data.snow > 0 && (data.showers || data.rain))
            return {img: SleetIcon, data: data.snow + " cm"};
        if (data.snow > 0)
            return {img: SnowIcon, data: data.snow + " cm"};
        if (data.showers > 0 && data.showers < 15 && !data.rain)
            return {img: DrizzleIcon, data: data.showers + " mm"};
        if (data.showers >= 15)
            return {img: RainIcon, data: data.showers + " mm"};
        if (data.rain > 0)
            return {img: RainIcon, data: data.rain + " mm"};
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


const rules = [
    [(temp, vis, rain, showers, snow) => temp <= 5 && (rain || showers), "Cold and wet, drive carefully."],
    [(temp, vis, rain, showers, snow) => temp <= 0 && snow, "Snowy and freezing. Expect icy conditions, Not recommend to drive."],
    [(temp, vis, rain, showers, snow) => snow > 0, "Snow expected. Not recommend to drive."],
    [(temp, vis, rain, showers, snow) => temp  <= 4, "Cold weather expected. Drive carefully."],
    [(temp, vis, rain, showers, snow) => (rain > 0 && rain < 25) || (showers > 0 && showers < 25), "Light rain expected."],
    [(temp, vis, rain, showers, snow) => rain >= 25 || showers >= 25, "Heavy rain expected. Drive carefully."],
    [(temp, vis, rain, showers, snow) => vis <= 50, "Dense fog. Not recommend to drive."],
    [(temp, vis, rain, showers, snow) => vis < 1000, "Foggy conditions, drive carefully."],
    [(temp, vis, rain, showers, snow) => temp >= 20 && !(rain || showers || snow), "Sunny and warm. Perfect to ride!"],
    [(temp, vis, rain, showers, snow) => true, "Mild weather with no significant hazards."]
];

export function getWeatherSummary(data) {
    for (const [condition, message] of rules) {
        if (condition(data.min_temp, data.min_visibility, data.rain, data.showers, data.snow)) {
            return message;
        }
    }
}