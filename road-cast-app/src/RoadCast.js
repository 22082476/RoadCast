import DataCircle from './DataCircle';
import RoadCastHeader from './RoadCastHeader';
import { useEffect, useState } from "react";

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

    let sunrise = data.sunrise.split('T')[1]
    let sunset = data.sunset.split('T')[1]

    return (
        <>
            <RoadCastHeader />
            <DataCircle main={data.min_temp + "\u00B0"} second={data.max_temp + "\u00B0"} />
            <DataCircle main={data.wind_gusts + " km/h"} second={data.wind_speed + " km/h"} />
            <DataCircle main={data.max_visibility + " m"} second={data.min_visibility + " m"} />
            <DataCircle main={sunrise} second={sunset} />
        </>
    );
}
