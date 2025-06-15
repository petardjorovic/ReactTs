import { useState } from 'react';

type PositionType = {
    lat: number;
    lng: number;
} | null;

export function useGeolocation(defaultPosition: PositionType = null) {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState<PositionType>(defaultPosition);
    const [error, setError] = useState('');

    function getPosition() {
        if (!navigator.geolocation) return setError('Your browser does not support geolocation');

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setIsLoading(false);
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
            }
        );
    }

    return { isLoading, position, error, getPosition };
}
