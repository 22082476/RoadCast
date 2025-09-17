import './RoadCastHeader.css';
import RoadcastImg from './icons/compass.svg';

export default function RoadCastHeader() {
    return (
        <>
            <div className="app-header">
                <h1>RoadCast</h1>
                <img className='app-header-icon' src={RoadcastImg} alt="Roadcast icon"/>
            </div>
            <div className="app-subheader">
                <h2>Current weather conditions for <span className="app-location">Gouda</span></h2>
            </div>
        </>
    );
}