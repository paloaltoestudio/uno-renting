import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";


const Map = (props) => {

  const [selectPoint, setSelectPoint] = useState(null);

  const [parking, setParking] = useState([
    { id: 1, lat: 6.234050, lng: -75.591068, name: 'Zona Parqueo 1', show: false },
    { id: 2, lat: 6.233730, lng: -75.592743, name: 'Zona Parqueo 2', show: false },
    { id: 3, lat: 6.232194, lng: -75.591820, name: 'Zona Parqueo 3', show: false }
  ]);

  const [location, setlocation] = useState({
    // Set Barcelona as default
    lat: 41.385063, 
    lng: 2.173404
  })

  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            setlocation({
              lat: pos.coords.latitude, 
              lng: pos.coords.longitude
            });
        });
      } else { 
        console.log("Geolocation is not supported by this browser.");
      }
});

  const libraries = ['places'];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBHOIH-d5-JeEO9ivWlLst307ymMKnHG94',
    libraries
  });
  

  const openInfo = (id) => {
    const point = parking.filter(parkingZone => parkingZone.id == id)
    setSelectPoint(point[0]);
  }

  const closeInfo = () => {
    setSelectPoint(null);
  }

  if(loadError) return <div className="error">loading error</div>;
  if(!isLoaded) return 'loading map';

  return (
    <GoogleMap
      mapContainerStyle={{width: '100%', height: '400px'}}
      zoom={15}
      center={{ lat: location.lat, lng: location.lng }}
    >
      
      {parking && parking.map(parkinkZone => {
        return (
            <Marker
              position={{ lat: parkinkZone.lat, lng: parkinkZone.lng }}
              onClick={() => {openInfo(parkinkZone.id)}}
            />
        )
      })}

            {selectPoint && (
              <InfoWindow
                position={{ lat: selectPoint.lat, lng: selectPoint.lng }}
                options={{pixelOffset: new window.google.maps.Size(0,-30)}}
                onCloseClick={closeInfo}
              >
                <div>
                  <h3>{selectPoint.name}</h3>
                  <p>Dirección</p>
                </div>
              </InfoWindow>
            )} 
      
    </GoogleMap>
  )

}

export default Map;
 

