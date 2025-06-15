import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';

import styles from './Map.module.css';
import { useCities } from '../../context/CitiesContext';
import Button from '../Button/Button';
import { useGeolocation } from '../../hooks/useGeoLocation';

export default function Map() {
    const { cities } = useCities();
    const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeolocation();
    const [searchParams] = useSearchParams();
    const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);

    const mapLat = searchParams.get('lat');
    const mapLng = searchParams.get('lng');

    useEffect(() => {
        if (mapLat && mapLng) {
            setMapPosition([Number(mapLat), Number(mapLng)]);
        }
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (geoLocationPosition) {
            setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
        }
    }, [geoLocationPosition]);

    return (
        <div className={styles.mapContainer}>
            {!geoLocationPosition && (
                <Button type='position' onClick={getPosition}>
                    {isLoadingPosition ? 'Loading...' : 'Use your position'}
                </Button>
            )}
            <MapContainer
                // center={[Number(mapLat) || 40, Number(mapLng) || 0]}
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                />
                {cities.map((city) => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }: { position: [number, number] }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        },
    });
    return null;
}
