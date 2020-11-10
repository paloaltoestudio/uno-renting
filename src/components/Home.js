import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { PreBookingContext } from '../contexts/PreBookingContext';
import { ZoneContext } from '../contexts/ZoneContext';
import Map from './Map';

const Home = (props) => {

    const { preBooking, setPreBooking } = useContext(PreBookingContext);
    const [metodo, setMetodo] = useState(preBooking.metodo);
    const [lugar, setLugar] = useState(preBooking.zona_id);
    const [zona, setZona] = useState('');
    const { transl } = useContext(LanguageContext);
    const { filterZone, zonas } = useContext(ZoneContext);

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
            console.log(preBooking)

            props.history.push('/zona');
        }
    }

    useEffect(() => {
        setZona(filterZone(lugar));
    }, [lugar, zona, filterZone])


    const renderAddressField = () => {
        if(metodo === 'parking_zone'){
            return(
               <div className="form-group">
                   <label htmlFor="">{transl('Lugar de Recogida')}</label>
                   <select onChange={(e) => handlePlace(e)} name="" id="" className="form-control" value={lugar} required>
                       <option value="">{transl('Dirección de Recogida')}</option>
                       {zonas && zonas.map(zona => {
                       return(
                       <option key={zona.id} value={zona.id}>{zona.nombre}</option>
                       )
                       })}
                   </select>
               </div>
            )
        } else if(metodo === 'delivery' || preBooking.metodo === 'delivery') {
            return (
                <div className="form-group">
                    <label htmlFor="">{transl('Dirección de Recogida')}</label>
                    <input onChange={(e) => handleAddress(e)} type="text" className="form-control" value={preBooking.direccion} />
                </div>
            )
        }
    }

    return (
            
        <div className="container">
            <div className="wrapper">
                <div className="left">
                {metodo && metodo === 'parking_zone' ?
                    (
                        <div class="map_wrapper">
                            <Map />
                        </div>
                    ) :

                    <img src="../images/scooter.jpg" alt=""/> }
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
                    
                    <ul className="list-unstyled">
                        <li>
                            <h3>{transl('Dirección de Recogida')}</h3>
                            <p>{zona.direccion}</p>
                        </li>
                        <li>
                            <h3>{zona.patinetes} {transl('Patinetes Disponibles')}</h3>
                        </li>
                        <li>
                            <h3>{transl('Horario de Operación')}</h3>
                            <p>{zona.horario}</p>
                        </li>
                    </ul>
                    
                    : '' }
                    
                    <button className="btn btn-primary mb-2 form-control">{transl('Continuar')}</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default withRouter(Home); 


