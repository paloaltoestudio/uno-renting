import React, { createContext, useState } from 'react';


export const ZoneContext = createContext();

const ZoneContextProvider = (props) => {

    const [zonas, setZonas] = useState([
        {
            id: 'parking_zone_1',
            nombre: 'Parking zone 1',
            direccion: "Carrer D'Estruc, 12 (Barrio Gótico)",
            patinetes: 3,
            horario: '8:00 a 18:00'
        },
        {
            id: 'parking_zone_2',
            nombre: 'Parking zone 2',
            direccion: "Carrer D'Estruc, 10 (Barrio Gótico)",
            patinetes: 2,
            horario: '9:00 a 19:00'
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


