import { Marker, useLoadScript } from '@react-google-maps/api';
import React, { useMemo } from 'react';

const GoogleMaps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  if (!isLoaded) return <div>Loading…</div>;

  return <Map />;
};

const Map = () => {
  const center = useMemo(() => ({ lat: 44, lng: -8 }), []);

  return (
    <GoogleMaps zoom={10} conter={center} mapContainerClassName="map-container">
      <Marker postion={center} />
    </GoogleMaps>
  );
};

export default GoogleMaps;
