import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { containerVariant } from './variants';
import { DirectionContext } from '../contexts/DirectionContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { BookingContext } from '../contexts/BookingContext';

const CancelarReserva = props => {
    const { isForward, setIsForward } = useContext(DirectionContext);
    const { booking } = useContext(BookingContext);
    const { transl } = useContext(LanguageContext);

    const handleClick = e => {
        e.preventDefault();
        props.history.push('/cancelar-reserva-notificacion');
    }

    return (
        <motion.div 
            variants={containerVariant}
            initial={isForward ? 'hidden' : 'hiddenBack'}
            animate="visible"
            exit={isForward ? 'exit' : 'exitBack'}
            className="container cancel_booking"
        >
            <div className="wrapper">
                <div className="left">
                    <img src="../images/scooter.jpg" alt=""/>
                </div>

                <div className="panel right">
                    <h2>Reserva Cancelada</h2>
                    
                    <h3>
                        Has cancelado la reserva para los patinetes
                        <span>{ booking.patinetes }</span>
                    </h3>

                    <p>Se te reembolsará tu pago, y se te cobrará una penalidad por cancelación</p>
                </div>
            </div>

        </motion.div>
    )
}

export default withRouter(CancelarReserva);