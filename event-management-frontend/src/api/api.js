import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const register = (username, password) => {
    return axios.post(`${API_URL}/register`, { username, password });
};

const login = (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
};

const createEvent = (token, event) => {
    return axios.post(`${API_URL}/events`, event, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const editEvent = (token, eventId, event) => {
    return axios.put(`${API_URL}/events/${eventId}`, event, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const deleteEvent = (token, eventId) => {
    return axios.delete(`${API_URL}/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const api = {
    register,
    login,
    createEvent,
    editEvent,
    deleteEvent,
};

export default api;
