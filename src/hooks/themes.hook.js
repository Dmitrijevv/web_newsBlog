import {useCallback } from 'react';
export const useTheme = () => {

    const dark = useCallback(() => {
        localStorage.setItem('themes', JSON.stringify({
            themeDark: true
        }))
    }, []);
    const light = () => {
        localStorage.removeItem('themes');
    };
    return { dark, light };
}