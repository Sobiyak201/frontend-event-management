import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import api from './api/api';

const App = () => {
    const [token, setToken] = useState('');
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);

    useEffect(() => {
        if (token) {
            
            fetchEvents();
        }
    }, [token]);

    const fetchEvents = async () => {
        try {
            console.log(token);
            const response = await axios.get('http://localhost:5000/api/events', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEvents(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching events', error);
        }
    };
    const handleEventSaved = () => {
        fetchEvents();
        setEditingEvent(null);
    };
    const handleEditEvent = (event) => {
        setEditingEvent(event);
    };

    
    return (
        <div>
            <h1>Event Management System</h1>
            {!token ? (
                <>
                    <RegisterForm />
                    <LoginForm setToken={setToken} />
                </>
            ) : (
                <>
                    <EventForm
                        token={token}
                        eventId={editingEvent?._id}
                        existingEvent={editingEvent}
                        onEventSaved={handleEventSaved}
                    />
                    <EventList
                        token={token}
                        events={events}
                        onEventDeleted={fetchEvents}
                        onEditEvent={handleEditEvent}
                    />
                </>
            )}
        </div>
    );
};
export default App;
