// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import styles from './Form.module.css';
import Button from '../Button/Button';
import ButtonBack from '../ButtonBack/ButtonBack';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';
import { convertToEmoji } from '../../utils/convertToEmoji';
import { useCities } from '../../context/CitiesContext';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const { createCity, isLoading } = useCities();
    const [lat, lng] = useUrlPosition();
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [cityName, setCityName] = useState('');
    const [country, setCountry] = useState('');
    const [date, setDate] = useState<Date>(new Date());
    const [notes, setNotes] = useState('');
    const [emoji, setEmoji] = useState('');
    const [geocodingError, setGeocodingError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!cityName || !date || !lat || !lng) return;
        const newCity = {
            cityName,
            country,
            date,
            emoji,
            notes,
            position: {
                lat: Number(lat),
                lng: Number(lng),
            },
        };
        await createCity(newCity);
        navigate('/app/cities/');
    }

    useEffect(() => {
        async function fetchCityData() {
            if (!lat || !lng) return;
            try {
                setGeocodingError('');
                setIsLoadingGeocoding(true);
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data: DataFetched = await res.json();
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

    if (!lat || !lng) return <Message message='Start by clicking somewhere on the map' />;

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor='cityName'>City name</label>
                <input id='cityName' onChange={(e) => setCityName(e.target.value)} value={cityName} />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor='date'>When did you go to {cityName}?</label>
                {/* <input id='date' onChange={(e) => setDate(e.target.value)} value={date} /> */}
                <DatePicker id='date' onChange={(date) => date && setDate(date)} selected={date} dateFormat={'dd/MM/yyyy'} />
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
