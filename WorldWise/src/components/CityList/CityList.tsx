import { useOutletContext } from 'react-router-dom';
import styles from './CityList.module.css';
import type { SidebarProps } from '../Sidebar/Sidebar';
import Spinner from '../Spinner/Spinner';
import CityItem from '../CityItem/CityItem';
import Message from '../Message/Message';

const useMyOutletContext = () => useOutletContext<SidebarProps>();

export default function CityList() {
    const { cities, isLoading } = useMyOutletContext();

    if (isLoading) return <Spinner />;

    if (!cities.length) return <Message message='Add your first city by clicking on a city on the map' />;

    return (
        <div className={styles.cityList}>
            {cities.map((city) => (
                <CityItem city={city} key={city.id} />
            ))}
        </div>
    );
}
