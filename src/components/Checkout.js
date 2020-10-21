import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import segway from '../images/segway.png';

const Checkout = props => {

    return (
        <div className="container">
            <div className="wrapper">
                <div className="checkout_left">
                    <div class="checkout_wrapper">
                        <h2>Segway MAX Pro</h2>
                        <img src={segway} alt=""/>
                        
                        <ul className="list-unstyled">
                        <li><span>Día de recogida:</span> agosto 28, 2020</li>
                        <li><span>Hora de recogida:</span> 9:00 AM</li>
                        <li><span>Lugar de recogida:</span> Zona de parqueo 1</li>
                        <li><span>Dirección de recogida:</span> Carrer d'Estruc - Barcelona</li>
                        <li><span>Residente:</span> Si</li>
                        <li><span>Período:</span> 4 Horas</li>
                        <li><span>Número de patinetes:</span> 3</li>
                        <li><span>Código de patinetes:</span> EU001, EU100, EU234</li>
                        <li><span>Número de cargadores:</span> 2</li>
                        
                        </ul>
                    </div>
                </div>

                <div className="checkout_right">
                    <div class="checkout_wrapper">
                        <h3>Información de Facturación</h3>
                        
                        <ul className="list-unstyled personal_data">
                            <li>Carlos Pérez</li>
                            <li>carlos@gmail.com</li>
                            <li>+34 12345678</li>
                        </ul>
                        
                        <div className="totals">
                        <p className="subtotal">
                        <span>Subtotal</span>
                        39.00€
                        </p>
                        
                        <p className="taxes">
                        <span>Impuestos</span>
                        0.00€
                        </p>
                        
                        <p className="total">
                        <span>Total</span>
                        <span>39.00€</span>
                        </p>
                        </div>

                        <Link to="/desbloquear" className="link">Paga con Stripe</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;

