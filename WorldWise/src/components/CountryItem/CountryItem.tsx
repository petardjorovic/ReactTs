import type { Country } from '../CountryList/CountryList';
import styles from './CountryItem.module.css';

function CountryItem({ country }: { country: Country }) {
    return (
        <li className={styles.countryItem}>
            <span>{country.emoji}</span>
            <span>{country.country}</span>
        </li>
    );
}

export default CountryItem;
