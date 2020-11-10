import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const Footer = props => {
    const { transl } = useContext(LanguageContext);

    return (
        <footer>
          <p className="text-center">{ transl('Todos los derechos reservados. Uno Smart Mobility OU®') }</p>
        </footer>
    )
}

export default Footer; 