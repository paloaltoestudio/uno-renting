import React, { createContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

export const PreBookingContext = createContext();

const PreBookingContextProvider = props => {

    const [preBooking, setPreBooking] = useState(() => {
        const localData = localStorage.getItem("preBooking");
        return localData ? JSON.parse(localData) : {
            metodo: '', 
            zona: '', 
            direccion: '',
            zona_id: '', 
            residente: '', 
            tiempo: '', 
            numero_patinetes: '',
            numero_cargadores: '',
            fecha_recogida: '',
            hora_recogida: '',
            metodo_entrega: '',
            zona_entrega_id: '',
            direccion_entrega: '',
            hora_entrega: '',
            conductores_patinetes: [],
            precio: 0
        }
    });

    useEffect(() => {
        localStorage.setItem("preBooking", JSON.stringify(preBooking));
    }, [preBooking]);

    return (
        <PreBookingContext.Provider value={{preBooking, setPreBooking}}>
            {props.children}
        </PreBookingContext.Provider>
    )
}

export default withRouter(PreBookingContextProvider);