import { createContext, useContext, useEffect, useState } from 'react';
import type { City } from '../layouts/AppLayout/AppLayout';

const BASE_URL = 'http://localhost:9001';

type CitiesCtxType = {
    cities: City[];
    isLoading: boolean;
};

const CitiesContext = createContext<CitiesCtxType | undefined>(undefined);

function CitiesProvider({ children }: { children: React.ReactNode }) {
    const [cities, setCities] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (err) {
                console.log(err);
                alert('There was en error loading data...');
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    return <CitiesContext.Provider value={{ cities, isLoading }}>{children}</CitiesContext.Provider>;
}

function useCities() {
    const context = useContext(CitiesContext);
    if (!context) throw new Error('CitiesContext must be used with the CitiesProvider');
    return context;
}

export { CitiesProvider, useCities };
