import React, { createContext, useState } from 'react';


export const ZoneContext = createContext();

const ZoneContextProvider = (props) => {

    const [zonas, setZonas] = useState([
        {
            id: 'parking_zone_1',
            nombre: 'Parking zone 1',
            direccion: "Carrer D'Estruc, 12 (Barrio Gótico)",
            patinetes: 3,
            horario: '8:00 a 18:00',
            lat: 6.234050, 
            lng: -75.591068,
            show: false

        },
        {
            id: 'parking_zone_2',
            nombre: 'Parking zone 2',
            direccion: "Carrer D'Estruc, 10 (Barrio Gótico)",
            patinetes: 2,
            horario: '9:00 a 19:00',
            lat: 6.233730, 
            lng: -75.592743,
            show: false
        },
        {
            id: 'parking_zone_3',
            nombre: 'Parking zone 3',
            direccion: "Carrer D'Estruc, 15 (Barrio Gótico)",
            patinetes: 2,
            horario: '9:00 a 19:00',
            lat: 6.232194, 
            lng: -75.591820,
            show: false
        }
    ]);

    const filterZone = (id) => { 
        const zonaInfo = zonas.find(zona => {
            return zona.id === id;
        });

        return zonaInfo;
    }

    return(
        <ZoneContext.Provider value={{zonas, filterZone}}>
            { props.children }
        </ZoneContext.Provider>
    )
}

export default ZoneContextProvider;


