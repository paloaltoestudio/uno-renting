import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

const LanguageContextProvider = props => {

    const [trans, setLanguage] = useState({
        lang: 'es',
        'Renta tu Patinete': {es: 'Renta tu Patinete', en: 'Rent your Scooter'},
        'Dirección de Recogida': {es: 'Dirección de Recogida', en: 'Picking Address'},
        'Lugar de Recogida': {es: 'Lugar de Recogida', en: 'Picking Point'},
        'Método de Recogida': {es: 'Método de Recogida', en: 'Picking Method'},
        'Continuar': {es: 'Continuar', en: 'Next'},
        'Patinetes Disponibles': {es: 'Patinetes Disponibles', en: 'Available Scooters'},
        'Horario de Operación': {es: 'Horario de Operación', en: 'Available Hours'},
        'Selecciona un lugar de recogida': {es: 'Selecciona un lugar de recogida', en: 'Choose the picking point'},
        'Selecciona un método de recogida': {es: 'Selecciona un método de recogida', en: 'Choose the picking method'},
        'Recogida en Zona de Parqueo': {es: 'Recogida en Zona de Parqueo', en: 'Pick up in Parking Area'},
        'Entrega a domicilio': {es: 'Entrega a domicilio', en: 'Home Delivery'},
    });

    return (
        <LanguageContext.Provider value={{trans, setLanguage}}>
            {props.children}
        </LanguageContext.Provider>
    )

}

export default LanguageContextProvider;