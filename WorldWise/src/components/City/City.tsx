import { useEffect } from 'react';
import { useCities } from '../../context/CitiesContext';
import styles from './City.module.css';
import { useParams } from 'react-router-dom';
import ButtonBack from '../ButtonBack/ButtonBack';
import Spinner from '../Spinner/Spinner';

const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
    }).format(new Date(date));

export default function City() {
    const { id } = useParams<{ id: string }>();
    const { currentCity, getCity, isLoading } = useCities();

    let emoji: string | undefined;
    let cityName: string | undefined;
    let date: string | undefined;
    let notes: string | undefined;

    if (currentCity) {
        emoji = currentCity.emoji;
        cityName = currentCity.cityName;
        date = currentCity.date;
        notes = currentCity.notes;
    }

    useEffect(() => {
        if (id) {
            getCity(id);
        }
    }, [id, getCity]);

    if (isLoading) return <Spinner />;

    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City name</h6>
                <h3>
                    <span>{emoji}</span> {cityName}
                </h3>
            </div>

            <div className={styles.row}>
                <h6>You went to {cityName} on</h6>
                <p>{date ? formatDate(date) : null}</p>
            </div>

            {notes && (
                <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{notes}</p>
                </div>
            )}

            <div className={styles.row}>
                <h6>Learn more</h6>
                <a href={`https://en.wikipedia.org/wiki/${cityName}`} target='_blank' rel='noreferrer'>
                    Check out {cityName} on Wikipedia &rarr;
                </a>
            </div>

            <div>
                <ButtonBack />
            </div>
        </div>
    );
}
