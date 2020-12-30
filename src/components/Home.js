import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { PreBookingContext } from '../contexts/PreBookingContext';
import { ZoneContext } from '../contexts/ZoneContext';
import { DirectionContext } from '../contexts/DirectionContext';
import Map from './Map';
import { motion } from 'framer-motion';
import { containerVariant } from './variants';

const Home = props => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { isForward, setIsForward } = useContext(DirectionContext);
    const { preBooking, setPreBooking } = useContext(PreBookingContext);
    const [metodo, setMetodo] = useState(preBooking.metodo);
    const [lugar, setLugar] = useState(preBooking.zona_id);
    const [zona, setZona] = useState('');
    const { transl } = useContext(LanguageContext);
    const { filterZone, zonas } = useContext(ZoneContext);

    useEffect(() => {
        setLugar(preBooking.zona_id);
    }, [preBooking])

    const handleMetodo = (e) => {

        console.log(e.target.value)
        setMetodo(e.target.value);

        setPreBooking({
            ...preBooking,
            metodo: e.target.value,
            direccion: '',
        });

        console.log(metodo)
    }

    const handlePlace = (e) => {
        setLugar(e.target.value);
    }

    const handleAddress = (e) => {
        console.log(e.target.value)

        setPreBooking({
            ...preBooking,
            direccion: e.target.value,
            direccion_entrega: e.target.value,
        });
        console.log(preBooking.direccion)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(metodo === 'delivery') {
            setPreBooking({
                ...preBooking,
                zona: '',
                zona_id: '',
                metodo_entrega: metodo
            });

            localStorage.setItem("preBooking", preBooking)

            console.log(preBooking)
            props.history.push('/zona');
            
        } else {
            setPreBooking({
                ...preBooking,
                zona: zona.nombre,
                direccion: zona.direccion,
                zona_id: zona.id,
                metodo_entrega: metodo,
                zona_entrega_id: zona.id,
                direccion_entrega: zona.direccion,
            });

            localStorage.setItem("preBooking", JSON.stringify(preBooking))
            
            console.log(preBooking)

            setIsForward(true);

            props.history.push('/zona');
        }
    }

    useEffect(() => {
        setZona(filterZone(lugar));
    }, [lugar, zona, filterZone])


    const renderAddressField = () => {
        if(metodo === 'parking_zone'){
            return(
               <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ type: 'spring', stiffness: 90 }}
                    className="form-group"
               >
                   <label htmlFor="">{transl('Lugar de Recogida')}</label>
                   <select onChange={(e) => handlePlace(e)} name="" id="" className="form-control" value={lugar} required>
                       <option value="">{transl('Dirección de Recogida')}</option>
                       {zonas && zonas.map(zona => {
                       return(
                       <option key={zona.id} value={zona.id}>{zona.nombre}</option>
                       )
                       })}
                   </select>
               </motion.div>
            )
        } else if(metodo === 'delivery' || preBooking.metodo === 'delivery') {
            return (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ type: 'spring', stiffness: 90 }}
                    className="form-group"
               >
                    <label htmlFor="">{transl('Dirección de Recogida')}</label>
                    <input onChange={(e) => handleAddress(e)} type="text" className="form-control" value={preBooking.direccion} />
                </motion.div>
            )
        }
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
                   
                {metodo && metodo === 'parking_zone' ?
                    (
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="map_wrapper">
                            <Map />
                        </motion.div>
                    ) :

                    <motion.img 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ type: 'spring', stiffness: 90 }}
                        src="../images/scooter.jpg" alt=""
                    /> 
                    }
                </div>
                <div className="panel right">
                    <div className="form-home">
                    <form onSubmit={(e) => handleSubmit(e, metodo, zona)} className="text-left">
                    <div className="form-group">
                        <label htmlFor="">{transl('Método de Recogida')}</label>
                        <select onChange={(e) => handleMetodo(e)} name="" id="" className="form-control" value={metodo} required>
                            <option value="">{transl('Selecciona un método de recogida')}</option>
                            <option value="parking_zone">{transl('Recogida en Zona de Parqueo')}</option>
                            <option value="delivery">{transl('Entrega a domicilio')}</option>
                        </select>
                    </div>
                    
                    { renderAddressField() }
                    
                    {lugar != '' && zona &&  metodo === 'parking_zone' ?
                    
                    <motion.ul 
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ type: 'spring', stiffness: 90 }}
                        className="list-unstyled"
                    >
                        <li>
                            <h3>{transl('Dirección de Recogida')}</h3>
                            <p>{zona.direccion}</p>
                        </li>
                        <li>
                            <h3>{transl('Horario de Operación')}</h3>
                            <p>{zona.horario}</p>
                        </li>
                    </motion.ul>
                    
                    : '' }
                    
                    <button className="btn btn-primary mb-2 form-control">{transl('Continuar')} <i class="fas fa-chevron-right"></i></button>
                    </form>
                    </div>
                </div>
            </div>
        </motion.div>
        
    )
}

export default withRouter(Home); 


