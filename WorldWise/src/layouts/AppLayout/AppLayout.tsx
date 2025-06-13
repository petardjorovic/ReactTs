import styles from './AppLayout.module.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Map from '../../components/Map/Map';
import { useEffect, useState } from 'react';

export type City = {
    cityName: string;
    country: string;
    emoji: string;
    date: string;
    notes: string;
    position: {
        lat: number;
        lng: number;
    };
    id: number;
};

const BASE_URL = 'http://localhost:9001';

export default function AppLayout() {
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

    return (
        <div className={styles.app}>
            <Sidebar cities={cities} isLoading={isLoading} />
            <Map />
        </div>
    );
}
