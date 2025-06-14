import styles from './CityList.module.css';
import Spinner from '../Spinner/Spinner';
import CityItem from '../CityItem/CityItem';
import Message from '../Message/Message';
import { useCities } from '../../context/CitiesContext';

export default function CityList() {
    const { cities, isLoading } = useCities();

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
