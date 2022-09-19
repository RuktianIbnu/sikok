import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function MapExample() {
    const defaultCenter = {
        lat: -2.1556299410997055,
        lng: 106.16382657378412,
    };
    
    return (
        <div className="relative w-full rounded-xl shadow-lg">
            <LoadScript googleMapsApiKey="AIzaSyCN5RsuQUGXEAd3TqNpEkHygtmhFxNiDZk">
                <GoogleMap
                    mapContainerClassName="w-full h-full rounded-xl"
                    zoom={13}
                    center={defaultCenter}
                >
                    <Marker key="location" position={defaultCenter} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
}
