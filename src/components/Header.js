import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const Header = props => {
    const { trans, setLanguage } = useContext(LanguageContext);
    const {lang} = trans;
    
    const changeLang = (e, lang) => {
        e.preventDefault();
        setLanguage({
            ...trans,
            lang
        })
    }


    return (
        <header className="text-center" >
            <h1><img src="https://unosmartmobility.com/wp-content/uploads/2019/09/uno_logo_scroll.png" alt=""/></h1>
            <h2>{trans['Renta tu Patinete'][lang]}</h2>

            <ul className="lang list-unstyled list-inline">
                <li className="list-inline-item">
                    <a className={lang === 'es' ? 'active' : ''} onClick={e => changeLang(e, 'es')} href="en">ES</a>
                </li>
                <li className="list-inline-item">
                    <a className={lang === 'en' ? 'active' : ''} onClick={e => changeLang(e, 'en')} href="en">EN</a>
                </li>
            </ul>
            
            
      </header>
    )
}

export default Header; 