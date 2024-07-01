import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';

const Auth = ({ isLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/auth/login' : '/auth/register';
        const userData = { username, password };
        if (!isLogin) {
            userData.role = role;
        }
        
        try {
            const response = await api.post(endpoint, userData);
            localStorage.setItem('token', response.data.token);
            history.push('/events');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {!isLogin && (
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            )}
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
    );
};

export default Auth;
