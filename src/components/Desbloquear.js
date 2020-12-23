import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';

const Desbloquear = props => {
    
    const [ lock, setLock ] = useState({
        EU001: true,
        EU002: true,
        EU003: true,
        all: true,
    });

    const clickUnlock = (e, id) => {
        e.preventDefault();

        if(id == 'all'){
            setLock({
                EU001: false,
                EU002: false,
                EU003: false,
                all: false,
            })
        } else {
            setLock({...lock, [id]: false})
        }
    }

    return (
        <motion.div 
            initial={{ x:'40vw' }}
            animate={{ x: 0 }} 
            transition={{ type: 'spring', stiffness: 90 }}
            className="container"
        >
            <div className="wrapper unlock">
                <div className="unlock_left">
                    <div className="unlock_wrapper">
                        <img src="../images/scooter.jpg" alt=""/>
                    </div>
                </div>

                <div className="unlock_right">
                    <div className="unlock_wrapper">
                        <h2>Desbloquea los patinetes</h2>
                        <p>Escoge los patinetes a desbloquear</p>
                        <ul className="list-unstyled">
                            <li><span>EU001</span> <a href="#!" onClick={e => clickUnlock(e, 'EU001')} className={ lock['EU001'] ? 'link lock' : 'link unlock'}>{ lock['EU001'] ? 'Desbloquear' : 'Desbloqueado' }</a></li>
                            <li><span>EU002</span> <a href="#!" onClick={e => clickUnlock(e, 'EU002')} className={ lock['EU002'] ? 'link lock' : 'link unlock'}>{ lock['EU002'] ? 'Desbloquear' : 'Desbloqueado' }</a></li>
                            <li><span>EU003</span> <a href="#!" onClick={e => clickUnlock(e, 'EU003')} className={ lock['EU003'] ? 'link lock' : 'link unlock'}>{ lock['EU003'] ? 'Desbloquear' : 'Desbloqueado' }</a></li>
                            <li><a href="#!" onClick={e => clickUnlock(e, 'all')} className={ lock['all'] ? 'link lock' : 'link unlock'}>{ lock['all'] ? 'Desbloquear Todos' : 'Desbloqueados' }</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Desbloquear;
