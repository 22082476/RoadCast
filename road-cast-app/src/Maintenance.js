import React, { useState, useEffect } from 'react';
import './Maintenance.css';

import { SprayCan, Gauge, Fuel, Droplets, Motorbike, Wrench } from 'lucide-react';

export default function Maintenance() {
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem('maintenanceEntries');
        return saved ? JSON.parse(saved) : [];
    });

    const [taskType, setTaskType] = useState('chain');
    const [km, setKm] = useState('');
    const [liters, setLiters] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (entries.length > 0 && km === '') {
            const lastEntry = entries[0];
            setKm(lastEntry.km.toString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const taskTypes = {
        chain: { label: 'Chain Lubing', icon: SprayCan },
        tires: { label: 'Tire Pressure', icon: Gauge },
        fuel: { label: 'Refueling', icon: Fuel },
        clean: { label: 'Cleaning', icon: Droplets },
        general: { label: 'General', icon: Wrench }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEntry = {
            id: Date.now(),
            type: taskType,
            km: parseFloat(km),
            liters: taskType === 'fuel' ? parseFloat(liters) : null,
            date: date,
            description: taskType === 'general' ? description : null
        };

        const updatedEntries = [newEntry, ...entries].sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );
        setEntries(updatedEntries);
        localStorage.setItem('maintenanceEntries', JSON.stringify(updatedEntries));

        // Keep the KM value for next entry (user can adjust if needed)
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
            <h1 className="maintenance-title">
                Motorcycle Maintenance
                <Motorbike size={32} strokeWidth={2} style={{ display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }} />
            </h1>

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
                        placeholder={entries.length > 0 ? `Last: ${entries[0].km} km` : "Enter km"}
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

                {taskType === 'general' && (
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-input"
                            placeholder="Enter Description"
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
                        {entries.map(entry => {
                            const IconComponent = taskTypes[entry.type].icon;
                            return (
                                <div key={entry.id} className="entry-card">
                                    <div className="entry-header">
                                        <div className="entry-title">
                                            <IconComponent
                                                className="entry-icon"
                                                size={24}
                                                strokeWidth={2}
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
                                        {entry.description && (
                                            <span className="entry-description">{entry.description}</span>
                                        )} 
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
