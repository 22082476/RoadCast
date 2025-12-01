import './RoadCastHeader.css';
import RoadcastImg from './icons/compass.svg';

export default function RoadCastHeader({ day, setDay, isLoading, currentView, setCurrentView }) {
    const dayText = day === 0 ? "Today" : "Tomorrow";
    const isWeatherView = currentView === 'weather';

    return (
        <>
            <div className="app-header">
                <h1>RoadCast</h1>
                <img className='app-header-icon' src={RoadcastImg} alt="Roadcast icon" />
            </div>

            {setCurrentView && (
                <div className="view-selector">
                    <button
                        className={currentView === 'weather' ? "active" : ""}
                        onClick={() => setCurrentView('weather')}
                    >
                        Weather
                    </button>
                    <button
                        className={currentView === 'maintenance' ? "active" : ""}
                        onClick={() => setCurrentView('maintenance')}
                    >
                        Maintenance
                    </button>
                </div>
            )}

            {isWeatherView && (
                <>
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
            )}
        </>
    );
}