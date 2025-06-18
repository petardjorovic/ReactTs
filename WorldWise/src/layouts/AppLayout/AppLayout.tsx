import styles from './AppLayout.module.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Map from '../../components/Map/Map';
import User from '../../components/User/User';

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
    id: string;
};

export default function AppLayout() {
    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
            <User />
        </div>
    );
}
