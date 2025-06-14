import styles from './CountryList.module.css';
import Spinner from '../Spinner/Spinner';
import CountryItem from '../CountryItem/CountryItem';
import Message from '../Message/Message';
import { useCities } from '../../context/CitiesContext';

export type Country = {
    country: string;
    emoji: string;
};

export default function CountryList() {
    const { cities, isLoading } = useCities();

    if (isLoading) return <Spinner />;

    if (!cities.length) return <Message message='Add your first city by clicking on a city on the map' />;

    const countries: Country[] = cities.reduce<Country[]>((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country)) {
            return [...arr, { country: city.country, emoji: city.emoji }];
        } else {
            return arr;
        }
    }, []);

    return (
        <div className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} key={country.country} />
            ))}
        </div>
    );
}
