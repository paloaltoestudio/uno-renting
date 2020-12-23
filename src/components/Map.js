import React, { useEffect, useState, useContext } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

import { PreBookingContext } from '../contexts/PreBookingContext';
import { ZoneContext } from '../contexts/ZoneContext';


const Map = (props) => {

  const [selectPoint, setSelectPoint] = useState(null);
  
  const { preBooking, setPreBooking } = useContext(PreBookingContext);

  const { zonas } = useContext(ZoneContext);


  const [location, setlocation] = useState({
    // Set Barcelona as default
    lat: 41.385063, 
    lng: 2.173404
  })


  const handleClick = e => {
    e.preventDefault();

    setPreBooking({
      ...preBooking,
      zona_id: e.target.id
    })

    setSelectPoint(null)
  }


  useEffect(() => {
    console.log('location', navigator.geolocation);
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            setlocation({
              lat: pos.coords.latitude, 
              lng: pos.coords.longitude
            });
        }, error => console.log(error), {enableHighAccuracy: true});
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
    const point = zonas.filter(zona => zona.id == id)
    setSelectPoint(point[0]);
  }

  const closeInfo = () => {
    setSelectPoint(null);
  }

  if(loadError) return <div className="error">loading error</div>;
  if(!isLoaded) return <div className="text-center">loading map</div>;

  return (
    <GoogleMap
      mapContainerStyle={{width: '100%', height: '400px'}}
      zoom={15}
      center={{ lat: location.lat, lng: location.lng }}
    >
      
      {zonas && zonas.map((zona, index) => {
        return (
            <Marker
              key={index}
              position={{ lat: zona.lat, lng: zona.lng }}
              onClick={() => {openInfo(zona.id)}}
            />
        )
      })}

            {selectPoint && (
              <InfoWindow
                position={{ lat: selectPoint.lat, lng: selectPoint.lng }}
                options={{pixelOffset: new window.google.maps.Size(0,-30)}}
                onCloseClick={closeInfo}
              >
                <div className="map_info">
                  <h3>{selectPoint.nombre}</h3>
                  <p>{selectPoint.direccion}</p>
                  <a id={selectPoint.id} onClick={e => handleClick(e)} href="#" className="link">Seleccionar Zona</a>
                </div>
              </InfoWindow>
            )} 
      
    </GoogleMap>
  )

}

export default Map;
 

