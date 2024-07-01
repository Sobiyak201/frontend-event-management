import React from 'react';
import axios from 'axios';

const EventList = ({ token, events, onEventDeleted, onEditEvent }) => {
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onEventDeleted();
        } catch (error) {
            console.error('Error deleting event', error);
        }
    };

    return (
        <ul>
            {events.map((event) => (
                <li key={event._id}>
                    {event.name} - {event.date}
                    <button onClick={() => onEditEvent(event)}>Edit</button>
                    <button onClick={() => handleDelete(event._id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default EventList;
