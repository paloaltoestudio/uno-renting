import React, { useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';
import Pagos from './Pagos';
import { PreBookingContext } from '../contexts/PreBookingContext';
import segway from '../images/segway.png';

const stripePromise = loadStripe('pk_test_MQVSk4TjwXbH6jhCiKL7kDLc002tjZpivx');


const Checkout = props => {

    const { preBooking, setPreBooking } = useContext(PreBookingContext);
    const [user, setUser] = useState({
        name: 'Carlos Pérez',
        email: 'carlos@gmail.com',
        phone: '+34 12345678'
    })

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
                            <li>{user.name}</li>
                            <li>{user.email}</li>
                            <li>{user.phone}</li>
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

                        <h3>Pagar</h3>
                        
                        <Pagos user={user} />

                        {/* <Link to="/desbloquear" className="link">Paga con Stripe</Link> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;

