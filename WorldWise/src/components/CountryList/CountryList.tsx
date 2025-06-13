import { useOutletContext } from 'react-router-dom';
import styles from './CountryList.module.css';
import type { SidebarProps } from '../Sidebar/Sidebar';
import Spinner from '../Spinner/Spinner';
import CountryItem from '../CountryItem/CountryItem';
import Message from '../Message/Message';

export type Country = {
    country: string;
    emoji: string;
};

const useMyOutletContext = () => useOutletContext<SidebarProps>();

export default function CountryList() {
    const { cities, isLoading } = useMyOutletContext();

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
