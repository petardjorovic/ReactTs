import styles from './City.module.css';
import { useParams, useSearchParams } from 'react-router-dom';

export default function City() {
    const { id } = useParams<{ id: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    return (
        <div className={styles.city}>
            <h1>City {id}</h1>
            <h2>
                Position: {lat}, {lng}
            </h2>
            <button onClick={() => setSearchParams({ lat: '23', lng: '50' })}>Change pos</button>
        </div>
    );
}
