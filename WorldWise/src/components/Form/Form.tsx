// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import styles from './Form.module.css';
import Button from '../Button/Button';
import ButtonBack from '../ButtonBack/ButtonBack';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';

export function convertToEmoji(countryCode: string) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

type DataFetched = {
    city: string;
    continent: string;
    continentCode: string;
    countryCode: string;
    countryName: string;
    latitude: number;
    locality: string;
    localityInfo: { administrative: []; informative: [] };
    localityLanguageRequested: string;
    longitude: number;
    lookupSource: string;
    plusCode: string;
    postcode: string;
    principalSubdivision: string;
    principalSubdivisionCode: string;
};

function Form() {
    const [lat, lng] = useUrlPosition();
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [cityName, setCityName] = useState('');
    const [country, setCountry] = useState('');
    const [date, setDate] = useState<string>(new Date().toString());
    const [notes, setNotes] = useState('');
    const [emoji, setEmoji] = useState('');
    const [geocodingError, setGeocodingError] = useState('');

    useEffect(() => {
        async function fetchCityData() {
            if (!lat || !lng) return;
            try {
                setGeocodingError('');
                setIsLoadingGeocoding(true);
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data: DataFetched = await res.json();
                console.log(data);
                if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else 😉");
                setCityName(data.city || data.locality || '');
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
            } catch (err) {
                console.log(err);
                if (err instanceof Error) {
                    setGeocodingError(err.message);
                }
            } finally {
                setIsLoadingGeocoding(false);
            }
        }
        fetchCityData();
    }, [lat, lng]);

    if (isLoadingGeocoding) return <Spinner />;

    if (geocodingError) return <Message message={geocodingError} />;

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor='cityName'>City name</label>
                <input id='cityName' onChange={(e) => setCityName(e.target.value)} value={cityName} />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor='date'>When did you go to {cityName}?</label>
                <input id='date' onChange={(e) => setDate(e.target.value)} value={date} />
            </div>

            <div className={styles.row}>
                <label htmlFor='notes'>Notes about your trip to {cityName}</label>
                <textarea id='notes' onChange={(e) => setNotes(e.target.value)} value={notes} />
            </div>

            <div className={styles.buttons}>
                <Button type='primary'>Add</Button>
                <ButtonBack />
            </div>
        </form>
    );
}

export default Form;
