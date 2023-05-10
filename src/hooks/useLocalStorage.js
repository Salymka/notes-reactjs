import React, {useState} from "react";

export function useLocalStorage(key) {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return null;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.log(error);
        }
    };
    return [storedValue, setValue];
}