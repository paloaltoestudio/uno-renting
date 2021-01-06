import React, {useContext, useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { PreBookingContext } from '../contexts/PreBookingContext';
import { DirectionContext } from '../contexts/DirectionContext';
import { motion } from 'framer-motion';
import { containerVariant } from './variants';

const DetallePatinete = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { transl } = useContext(LanguageContext);
    const { preBooking, setPreBooking } = useContext(PreBookingContext);
    const { isForward, setIsForward } = useContext(DirectionContext);
    const [ drivers, setDrivers ] = useState([]);

    const handleChange = (e) => {
        if(e.target.name === 'dni'){
            setPreBooking(
                {
                    ...preBooking,
                    conductores_patinetes: {
                        ...preBooking.conductores_patinetes,
                        ['conductor_1']: { ...preBooking.conductores_patinetes['conductor_1'], dni: e.target.value }
                    }
                }
            );
        } else {

            setPreBooking(
                {
                    ...preBooking,
                    conductores_patinetes: {
                        ...preBooking.conductores_patinetes,
                        [e.target.name]: { ...preBooking.conductores_patinetes[e.target.name], nombre: e.target.value }
                    }
                }
            );
        }
        
    }

    const handleSelect = (e) => {
        setPreBooking(
            {
                ...preBooking,
                conductores_patinetes: {
                    ...preBooking.conductores_patinetes,
                    [e.target.id]: { ...preBooking.conductores_patinetes[e.target.id], mayor_16: e.target.checked }
                }
            }
        );
    }

    console.log(preBooking)

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setDrivers([
            ...drivers
        ]);

        setPreBooking(
            {
                ...preBooking,
                conductores_patinetes: {...preBooking.conductores_patinetes}
            }
        );

        console.log('conductores', drivers)

        setIsForward(true);

        props.history.push('/checkout');
    }

    // Fieldset for drivers based on scooter amount
    const driversFields = [];
    const driversAmount = Number(preBooking.numero_patinetes);
    let i;
    
    for( i = 1; i < driversAmount + 1 ; i++){

        driversFields.push(
            <div key={i}>
                <div className="form-group">
                    <label>Conductor {i}</label>
                    <input onChange={handleChange} type="text" name={'conductor_' + i} className="form-control" value={preBooking.conductores_patinetes['conductor_' + i] ? preBooking.conductores_patinetes['conductor_' + i].nombre : ''} placeholder="Nombre" required />
                </div>
                { preBooking.residente === 'si' && i == 1 ?
                <div className="form-group">
                    <input onChange={handleChange} type="text" name="dni" className="form-control" value={preBooking.conductores_patinetes['conductor_1'] ? preBooking.conductores_patinetes['conductor_1'].dni : ''} placeholder="DNI" required />
                </div>
                : ''
                }

                <div className="form-check">
                  <input onChange={handleSelect} type="checkbox" className="form-check-input" id={'conductor_' + i} checked={preBooking.conductores_patinetes['conductor_' + i] && preBooking.conductores_patinetes['conductor_' + i]['mayor_16'] ? true : false } required />
                  <label className="form-check-label" htmlFor={'conductor_' + i}>Es mayor de 16 años</label>
                </div>
            </div>
        )
    }

    const backLink = e => {
        e.preventDefault();
        props.history.push('/entrega');
        setIsForward(false);
    }

    return (
        <motion.div 
            variants={containerVariant}
            initial={isForward ? 'hidden' : 'hiddenBack'}
            animate="visible"
            exit={isForward ? 'exit' : 'exitBack'}
            className="container"
        >
            <div className="wrapper">
                <div className="left">
                    <img src="../images/scooter.jpg" alt=""/>
                </div>

                <div className="panel right scooter_detail">
                    <h2>Patinetes</h2>
                    <p>Por favor ingresa el conductor de cada patinete</p>

                    <form onSubmit={(e) => {handleSubmit(e)}}>
                            
                        { driversFields }

                        <button className="btn btn-primary mb-2 form-control">{transl('Continuar')} <i className="fas fa-chevron-right"></i></button>
                    </form>
                    <a href="#" className="back_btn" onClick={(e) => backLink(e)} to="/">
                        <i className="fas fa-chevron-left"></i>
                        Atrás
                    </a>
                </div>
            </div>
        </motion.div >    
    )
}

export default withRouter(DetallePatinete);