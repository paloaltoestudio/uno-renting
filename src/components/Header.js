import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { LanguageContext } from '../contexts/LanguageContext';

const Header = props => {
    const { transl, lang, setLanguage } = useContext(LanguageContext);
    
    const changeLang = (e, newLang) => {
        e.preventDefault();
        setLanguage(newLang)
    }


    return (
        <header className="main_header" >
            <h1>
                <Link to="/">
                    <img src="https://unosmartmobility.com/wp-content/uploads/2019/09/uno_logo_scroll.png" alt=""/>
                </Link>
            </h1>
            <h2 className="title">{transl('Renta tu Patinete')}</h2>

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