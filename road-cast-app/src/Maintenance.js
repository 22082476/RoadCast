import React, { useState } from 'react';
import './Maintenance.css';

// Import icons
import ChainIcon from './icons/sleet.svg';
import TireIcon from './icons/compass.svg';
import FuelIcon from './icons/drizzle.svg';
import CleanIcon from './icons/clear-day.svg';

export default function Maintenance() {
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem('maintenanceEntries');
        return saved ? JSON.parse(saved) : [];
    });

    const [taskType, setTaskType] = useState('chain');
    const [km, setKm] = useState('');
    const [liters, setLiters] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const taskTypes = {
        chain: { label: 'Chain Lubing', icon: ChainIcon },
        tires: { label: 'Tire Pressure', icon: TireIcon },
        fuel: { label: 'Refueling', icon: FuelIcon },
        clean: { label: 'Cleaning', icon: CleanIcon }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEntry = {
            id: Date.now(),
            type: taskType,
            km: parseFloat(km),
            liters: taskType === 'fuel' ? parseFloat(liters) : null,
            date: date
        };

        const updatedEntries = [newEntry, ...entries].sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );
        setEntries(updatedEntries);
        localStorage.setItem('maintenanceEntries', JSON.stringify(updatedEntries));

        setKm('');
        setLiters('');
        setDate(new Date().toISOString().split('T')[0]);
    };

    const deleteEntry = (id) => {
        const updatedEntries = entries.filter(entry => entry.id !== id);
        setEntries(updatedEntries);
        localStorage.setItem('maintenanceEntries', JSON.stringify(updatedEntries));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('nl-NL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="maintenance-container">
            <h1 className="maintenance-title">Motorcycle Maintenance</h1>

            <form className="maintenance-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Task</label>
                    <select
                        value={taskType}
                        onChange={(e) => setTaskType(e.target.value)}
                        className="form-select"
                    >
                        {Object.entries(taskTypes).map(([key, { label }]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Odometer (km)</label>
                    <input
                        type="number"
                        value={km}
                        onChange={(e) => setKm(e.target.value)}
                        required
                        className="form-input"
                        placeholder="Enter km"
                    />
                </div>

                {taskType === 'fuel' && (
                    <div className="form-group">
                        <label>Liters</label>
                        <input
                            type="number"
                            step="0.01"
                            value={liters}
                            onChange={(e) => setLiters(e.target.value)}
                            className="form-input"
                            placeholder="Enter liters"
                        />
                    </div>
                )}

                <button type="submit" className="btn-add">Add Entry</button>
            </form>

            <div className="maintenance-history">
                <h2>History</h2>
                {entries.length === 0 ? (
                    <p className="no-entries">No maintenance entries yet</p>
                ) : (
                    <div className="entries-list">
                        {entries.map(entry => (
                            <div key={entry.id} className="entry-card">
                                <div className="entry-header">
                                    <div className="entry-title">
                                        <img
                                            src={taskTypes[entry.type].icon}
                                            alt={taskTypes[entry.type].label}
                                            className="entry-icon"
                                        />
                                        <span className="entry-type">{taskTypes[entry.type].label}</span>
                                    </div>
                                    <button
                                        onClick={() => deleteEntry(entry.id)}
                                        className="btn-delete"
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="entry-details">
                                    <span className="entry-date">{formatDate(entry.date)}</span>
                                    <span className="entry-km">{entry.km} km</span>
                                    {entry.liters && (
                                        <span className="entry-liters">{entry.liters} L</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
