import './RoadCastHeader.css';
import RoadcastImg from './icons/compass.svg';

export default function RoadCastHeader({ day, setDay, isLoading }) {
    const dayText = day === 0 ? "Today" : "Tomorrow";
    return (
        <>
            <div className="app-header">
                <h1>RoadCast</h1>
                <img className='app-header-icon' src={RoadcastImg} alt="Roadcast icon" />
            </div>
            <div className={`day-selector-pill ${isLoading ? 'loading' : ''}`}>
                <button
                    className={day === 0 ? "active" : ""}
                    onClick={() => setDay(0)}
                    disabled={isLoading}
                >
                    Today
                </button>
                <button
                    className={day === 1 ? "active" : ""}
                    onClick={() => setDay(1)}
                    disabled={isLoading}
                >
                    Tomorrow
                </button>
            </div>
            <div className="app-subheader">
                <h2>Weather conditions for <span className="app-location">{dayText}</span></h2>
            </div>
        </>
    );
}