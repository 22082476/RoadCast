import DataCircle from './DataCircle';
import RoadCastHeader from './RoadCastHeader';
import { useEffect, useState } from "react";
import TempIcon from './icons/thermometer-celsius.svg';
import WindIcon from './icons/wind.svg';
import { getSunsetRise, getPrecipitation, getVisibilityIcon } from './RoadCastFunctions';

export default function RoadCast() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("https://8sw2jpc8s8.execute-api.eu-central-1.amazonaws.com/default/motor-radar-api")
            .then(res => res.json())
            .then(setData)
            .catch(console.error);
    }, []);

    if (!data) {
        return <p>Loading...</p>;
    }

    console.log(data)

    let sunriseSunset = getSunsetRise(data);
    let visibilityIcon = getVisibilityIcon(data);
    let precipitation = getPrecipitation(data);

    return (
        <>
            <RoadCastHeader />
            <DataCircle img={TempIcon} main={data.min_temp + "\u00B0"} second={data.max_temp + "\u00B0"} />
            <DataCircle img={WindIcon} main={data.wind_gusts + " km/h"} second={data.wind_speed + " km/h"} />
            <DataCircle img={visibilityIcon} main={data.min_visibility + " m"} second={data.max_visibility + " m"} />
            <DataCircle img={sunriseSunset.img} main={sunriseSunset.main} second={sunriseSunset.second} />
            <DataCircle img={precipitation.img} main={precipitation.data} second={""} />
        </>
    );
}
