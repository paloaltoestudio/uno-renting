import React, { createContext, useState } from 'react';
import dictionary from '../assets/lang.json';

export const LanguageContext = createContext();

const LanguageContextProvider = props => {

    const [lang, setLanguage] = useState('es');

    const transl = (phrase) => {
        console.log(phrase)
        if(dictionary[phrase]){
            return dictionary[phrase][lang];
        } else {
            return phrase;
        }
    }

    return (
        <LanguageContext.Provider value={{ lang, setLanguage, transl }}>
            {props.children}
        </LanguageContext.Provider>
    )

}

export default LanguageContextProvider;