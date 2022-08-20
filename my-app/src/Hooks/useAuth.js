import { useState } from 'react';

export const useAuth = () => {
    const [switcher, setSwitcher] = useState(null);

    return {
        switcher,
        setSwitcher,
    };
}