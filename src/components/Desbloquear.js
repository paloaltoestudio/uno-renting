import React, { useState, useContext } from 'react';

const Desbloquear = props => {
    
    const [ unlock, setUnlock ] = useState({lock: true});

    const clickUnlock = (e) => {
        e.preventDefault();

        setUnlock({lock: !unlock.lock})
    }

    return (
        <div className="container">
            <div className="wrapper unlock">
                <div className="unlock_left">
                    <div class="unlock_wrapper">
                        <img src="../images/scooter.jpg" alt=""/>
                    </div>
                </div>

                <div className="unlock_right">
                    <div class="unlock_wrapper">
                        <h2>Desbloquea los patinetes</h2>
                        <p>Escoge los patinetes a desbloquear</p>
                        <ul className="list-unstyled">
                            <li><span>EU001</span> <a href="#!" className={ unlock.lock ? 'link lock' : 'link unlock'}>Desbloquear</a></li>
                            <li><span>EU002</span> <a href="#!" className={ unlock.lock ? 'link lock' : 'link unlock'}>Desbloquear</a></li>
                            <li><span>EU003</span> <a href="#!" className={ unlock.lock ? 'link lock' : 'link unlock'}>Desbloquear</a></li>
                            <li><a href="#!" className={ unlock.lock ? 'link lock' : 'link unlock'}>Desbloquear Todos</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Desbloquear;
