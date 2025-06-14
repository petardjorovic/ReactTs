import styles from './AppLayout.module.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Map from '../../components/Map/Map';
import { CitiesProvider } from '../../context/CitiesContext';

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

export default function AppLayout() {
    return (
        <div className={styles.app}>
            <CitiesProvider>
                <Sidebar />
                <Map />
            </CitiesProvider>
        </div>
    );
}
