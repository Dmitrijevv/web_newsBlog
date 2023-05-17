import { useState, useEffect, useCallback } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [nameUser, setNameUser] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const login = useCallback((jwtToken, id, name) => {
        setToken(jwtToken);
        setUserId(id);
        setNameUser(name);
        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            token: jwtToken,
            nameUser: name
        }))
    }, []);
    const logout = () => {
        setToken(null);
        setUserId(null);
        setNameUser(null);
        localStorage.removeItem('userData');
    };
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if (data && data.token) {
            login(data.token, data.userId, data.nameUser)
        }
        setIsReady(true);
    }, [login])
    return { login, logout, isReady, token, userId, nameUser };
}