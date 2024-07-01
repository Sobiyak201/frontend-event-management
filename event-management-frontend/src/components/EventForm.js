import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = ({ token, eventId, existingEvent, onEventSaved }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (existingEvent) {
            setName(existingEvent.name);
            setDate(existingEvent.date);
        }
    }, [existingEvent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (eventId) {
                await axios.put(`http://localhost:5000/api/events/${eventId}`, { name, date }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post('http://localhost:5000/api/events', { name, date }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            
            onEventSaved();
        } catch (error) {
            console.error('Error saving event', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Event Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit">{eventId ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default EventForm;
