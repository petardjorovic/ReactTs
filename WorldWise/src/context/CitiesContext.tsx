import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import type { City } from '../layouts/AppLayout/AppLayout';

type CitiesCtxType = {
    cities: City[];
    isLoading: boolean;
    currentCity: City | null;
    error: string;
    getCity: (id: string) => Promise<void>;
    createCity: (city: NewCity) => Promise<void>;
    deleteCity: (id: string) => Promise<void>;
};

type NewCity = {
    cityName: string;
    country: string;
    date: Date;
    emoji: string;
    notes: string;
    position: {
        lat: number;
        lng: number;
    };
};

type InitState = {
    cities: City[];
    currentCity: City | null;
    isLoading: boolean;
    error: string;
};

type ActionType =
    | { type: 'loading' }
    | { type: 'cities/loaded'; payload: City[] }
    | { type: 'city/loaded'; payload: City }
    | { type: 'city/created'; payload: City }
    | { type: 'city/deleted'; payload: string }
    | { type: 'rejected'; payload: string };

const BASE_URL = 'http://localhost:9001';

const CitiesContext = createContext<CitiesCtxType | undefined>(undefined);

function reducer(state: InitState, action: ActionType) {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: true };
        case 'cities/loaded':
            return { ...state, isLoading: false, cities: action.payload };
        case 'city/loaded':
            return { ...state, isLoading: false, currentCity: action.payload };
        case 'city/created':
            return { ...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload };
        case 'city/deleted':
            return { ...state, isLoading: false, cities: state.cities.filter((city) => city.id !== action.payload), currentCity: null };
        case 'rejected':
            return { ...state, error: action.payload };
        default:
            throw new Error('Unknown action type');
    }
}

const initialState: InitState = {
    cities: [],
    currentCity: null,
    isLoading: false,
    error: '',
};

function CitiesProvider({ children }: { children: React.ReactNode }) {
    const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchCities() {
            dispatch({ type: 'loading' });
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: 'cities/loaded', payload: data });
            } catch (err) {
                console.log(err);
                dispatch({ type: 'rejected', payload: 'There was en error loading cities...' });
            }
        }
        fetchCities();
    }, []);

    const getCity = useCallback(async function getCity(id: string) {
        dispatch({ type: 'loading' });
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: 'city/loaded', payload: data });
        } catch (err) {
            console.log(err);
            dispatch({ type: 'rejected', payload: 'There was en error loading city...' });
        }
    }, []);

    async function createCity(city: NewCity) {
        dispatch({ type: 'loading' });
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(city),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            dispatch({ type: 'city/created', payload: data });
        } catch (err) {
            console.log(err);
            dispatch({ type: 'rejected', payload: 'There was en error creating city...' });
        }
    }

    async function deleteCity(id: string) {
        dispatch({ type: 'loading' });
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            });
            dispatch({ type: 'city/deleted', payload: id });
        } catch (err) {
            console.log(err);
            alert('There was en error deleting city...');
        }
    }

    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, error, getCity, createCity, deleteCity }}>
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (!context) throw new Error('CitiesContext must be used with the CitiesProvider');
    return context;
}

export { CitiesProvider, useCities };
