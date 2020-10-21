import React, { createContext, useState } from 'react';
import { withRouter } from 'react-router-dom';

export const PreBookingContext = createContext();

const PreBookingContextProvider = props => {

    const [preBooking, setPreBooking] = useState({
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
        hora_entrega: ''

    });

    return (
        <PreBookingContext.Provider value={{preBooking, setPreBooking}}>
            {props.children}
        </PreBookingContext.Provider>
    )
}

export default withRouter(PreBookingContextProvider);