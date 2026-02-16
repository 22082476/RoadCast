'use client';
import DataCircle from './DataCircle';
import RoadCastHeader from './RoadCastHeader';
import { useEffect, useState } from "react";
const TempIcon = '/icons/thermometer-celsius.svg';
const WindIcon = '/icons/wind.svg';
import { getSunsetRise, getPrecipitation, getVisibilityIcon, getWeatherSummary } from './RoadCastFunctions';
import RoadCastTextField from './RoadCastTextField';
import Maintenance from './Maintenance';

export default function RoadCast() {
    const [data, setData] = useState(null);
    const [day, setDay] = useState(0); // 0 for Today, 1 for Tomorrow
    const [isLoading, setIsLoading] = useState(false);
    const [currentView, setCurrentView] = useState('weather'); // 'weather' or 'maintenance'

    useEffect(() => {
        setIsLoading(true);
        console.log(`https://roadcast-api.vercel.app?day=${day}`)
        fetch(`https://roadcast-api.vercel.app?day=${day}`)
            .then(res => res.json())
            .then(newData => {
                setData(newData);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [day]);

    if (!data && currentView === 'weather') {
        return <p>Loading...</p>;
    }
    console.log(data)
    // Show maintenance view
    if (currentView === 'maintenance') {
        return (
            <>
                <RoadCastHeader day={day} setDay={setDay} isLoading={isLoading} currentView={currentView} setCurrentView={setCurrentView} />
                <Maintenance />
            </>
        );
    }

    // Show weather view
    let summary = getWeatherSummary(data);
    let sunriseSunset = getSunsetRise(data, day);
    let visibilityIcon = getVisibilityIcon(data);
    let precipitation = getPrecipitation(data);

    return (
        <>
            <RoadCastHeader day={day} setDay={setDay} isLoading={isLoading} currentView={currentView} setCurrentView={setCurrentView} />
            <RoadCastTextField text={summary} />
            <DataCircle img={TempIcon} main={data.min_temp + "\u00B0"} second={data.max_temp + "\u00B0"} />
            <DataCircle img={precipitation.img} main={precipitation.data} second={""} />
            <DataCircle img={WindIcon} main={data.wind_gusts + " km/h"} second={data.wind_speed + " km/h"} />
            <DataCircle img={visibilityIcon} main={data.min_visibility + " m"} second={""} />
            <DataCircle img={sunriseSunset.img} main={sunriseSunset.main} second={sunriseSunset.second} />
        </>
    );
}
