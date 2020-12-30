import React, { useState, useContext, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Pagos from './Pagos';
import { PreBookingContext } from '../contexts/PreBookingContext';
import { DirectionContext } from '../contexts/DirectionContext';
import segway from '../images/segway.png';
import { motion } from 'framer-motion';
import { containerVariant } from './variants';

const stripePromise = loadStripe('pk_test_MQVSk4TjwXbH6jhCiKL7kDLc002tjZpivx');


const Checkout = props => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { isForward, setIsForward } = useContext(DirectionContext);
    const { preBooking, setPreBooking } = useContext(PreBookingContext);
    const [user, setUser] = useState({
        name: 'Carlos Pérez',
        email: 'carlos@gmail.com',
        phone: '+34 12345678'
    })

    return (
        <motion.div 
            variants={containerVariant}
            initial={isForward ? 'hidden' : 'hiddenBack'}
            animate="visible"
            exit={isForward ? 'exit' : 'exitBack'}
            className="container"
        >
            <div className="wrapper checkout">
                <div className="checkout_left">
                    <div className="checkout_wrapper">
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
                    <div className="checkout_wrapper">

                        <div className="totals">
                            <h3>Totales</h3>

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

                        <div className="user_info">
                            <h3>Información de Facturación</h3>
                            
                            <Pagos user={user} />

                            {/* <Link to="/desbloquear" className="link">Paga con Stripe</Link> */}
                        </div>

                    </div>
                </div>
            </div>
        </motion.div >
    )
}

export default Checkout;

