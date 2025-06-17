import styles from './CityItem.module.css';
import type { City } from '../../layouts/AppLayout/AppLayout';
import { Link } from 'react-router-dom';
import { useCities } from '../../context/CitiesContext';

type CityProps = {
    city: City;
};

const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));

function CityItem({ city }: CityProps) {
    const { currentCity, deleteCity } = useCities();
    const { cityName, emoji, date, id, position } = city;

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        deleteCity(id);
    }

    return (
        <li>
            <Link
                className={`${styles.cityItem} ${currentCity ? (currentCity.id === id ? styles['cityItem--active'] : '') : ''}`}
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn} onClick={handleClick}>
                    &times;
                </button>
            </Link>
        </li>
    );
}

export default CityItem;
