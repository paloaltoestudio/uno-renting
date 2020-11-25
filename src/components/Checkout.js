import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PreBookingContext } from '../contexts/PreBookingContext';
import segway from '../images/segway.png';

const Checkout = props => {

    const { preBooking, setPreBooking } = useContext(PreBookingContext);

    return (
        <div className="container">
            <div className="wrapper">
                <div className="checkout_left">
                    <div class="checkout_wrapper">
                        <h2>Segway MAX Pro</h2>
                        <img src={segway} alt=""/>
                        
                        <ul className="list-unstyled">
                        <li><span>Día de recogida:</span> {preBooking.fecha_recogida} </li>
                        <li><span>Hora de recogida:</span> {preBooking.hora_recogida}</li>
                        <li><span>Lugar de recogida:</span> {preBooking.zona}</li>
                        <li><span>Dirección de recogida:</span> {preBooking.direccion}</li>
                        <li><span>Residente:</span> {preBooking.residente}</li>
                        <li><span>Período:</span> {preBooking.tiempo} día(s)</li>
                        <li><span>Número de patinetes:</span> {preBooking.numero_patinetes}</li>
                        <li><span>Número de cargadores:</span> {preBooking.numero_cargadores}</li>
                        
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
                        {preBooking.precio}.00€
                        </p>
                        
                        <p className="taxes">
                        <span>Impuestos</span>
                        0.00€
                        </p>
                        
                        <p className="total">
                        <span>Total</span>
                        <span>{preBooking.precio}.00€</span>
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

