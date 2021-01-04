import React, { useEffect, useState, useContext } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'; 

import { PreBookingContext } from '../contexts/PreBookingContext';
import { ZoneContext } from '../contexts/ZoneContext';


const Map = (props) => {

  const [selectPoint, setSelectPoint] = useState(null);
  
  const { preBooking, setPreBooking } = useContext(PreBookingContext);

  const { zonas } = useContext(ZoneContext);

  const [viewport, setViewport] = useState({
    // Set Barcelona as default
    latitude: 41.385063,
    longitude: 2.173404,
    height: '400px',
    width: '100%',
    zoom: 14
  });

  useEffect(() => {
    console.log('location', navigator.geolocation, navigator.geolocation.getCurrentPosition);
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          console.log('location', pos.coords.latitude, pos.coords.longitude);
          setViewport({
              ...viewport,
              latitude: pos.coords.latitude, 
              longitude: pos.coords.longitude
            });
        }, error => console.log(error), {enableHighAccuracy: true});
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
    
  }, []);

  useEffect(() => {
    const listener = e => {
      if(e.key === 'Escape'){
        setSelectPoint(null);
      }
    }

    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, []);

  const handleClick = e => {
    e.preventDefault();

    setPreBooking({
      ...preBooking,
      zona_id: e.target.id
    })

    setSelectPoint(null)
  }

  const closeInfo = (e) => {
    setSelectPoint(null);
  }

  return (
    <ReactMapGL 
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={viewport => setViewport(viewport)}
    >
      {zonas && zonas.map(zona => (
          <Marker
              key={zona.id}
              latitude={zona.lat}
              longitude={zona.lng}
              offsetTop={-60}  
              offsetLeft={-30/2}
          >
            <button className="marker_btn"
              onClick={() => {setSelectPoint(zona)}}
            >
              <img src="./images/scooter.svg" width="30" />
            </button>
          </Marker>
      ))}
      
      {selectPoint ? (
        <Popup
          latitude={selectPoint.lat}
          longitude={selectPoint.lng}
          offsetTop={-60}
          closeOnClick={false}
          onClose={() => closeInfo()}
        >
          <div className="map_info">
            <h3>{selectPoint.nombre}</h3>
            <p>{selectPoint.direccion}</p>
            <a id={selectPoint.id} onClick={e => handleClick(e)} href="#" className="link">Seleccionar Zona</a>
          </div>
        </Popup>
      ) : null }
    </ReactMapGL>
  )

}

export default Map;
 

