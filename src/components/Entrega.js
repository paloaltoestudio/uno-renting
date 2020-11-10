import React, { useState, useContext, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import { PreBookingContext } from '../contexts/PreBookingContext';
import { ZoneContext} from '../contexts/ZoneContext';

const DetalleEntrega = props => {

    const { preBooking, setPreBooking } = useContext(PreBookingContext);
    const [lugar, setLugar] = useState(preBooking.zona_entrega_id);
    const { filterZone, zonas } = useContext(ZoneContext);
    const [zona, setZona] = useState('');
    const [metodo, setMetodo] = useState(preBooking.metodo_entrega);
    const { metodo_entrega, lugar_entrega, hora_entrega, hora_recogida, tiempo } = preBooking;
    const minTime = hora_recogida.split(':');
    const minHour = Number(minTime[0]);
    const minMinutes = Number(minTime[1]);

    const limitTime = hora_entrega.split(':');
    const limitHour = minHour;
    const limitMinute = minMinutes;

    const [finalTime, setFinalTime]  = useState(hora_entrega);

    const [startTime, setStartTime] = useState(
        setHours(setMinutes(new Date(), limitMinute),limitHour)
    );

    const changeTime = (time) => {

        if(time.getHours() <= limitHour) {
            const finalHour = time.getHours();
            const finalMinutes = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
            setStartTime(setHours(setMinutes(new Date(), finalMinutes),finalHour));

            console.log(finalHour + ':' + finalMinutes);

            setFinalTime(finalHour + ':' + finalMinutes);
        }
        
    }

    const handleMethod = (e) => {

        console.log(e.target.value)
        setMetodo(e.target.value);

        setPreBooking({
            ...preBooking,
            metodo_entrega: e.target.value,
            direccion_entrega: '',
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
            direccion_entrega: e.target.value,
        });
        console.log(preBooking)
    }

    const handleChange = (e) => {
        
        setPreBooking({
            ...preBooking,
            [e.target.name]: e.target.value
        });

        console.log(preBooking);
    }

    const renderAddressField = () => {
        if(metodo_entrega === 'parking_zone'){
            return(
               <div className="form-group">
                   <label htmlFor="">Lugar de Entrega</label>
                   <select onChange={(e) => handlePlace(e)} name="" id="" className="form-control" value={preBooking.zona_entrega_id} required>
                       <option value="">Selecciona un lugar de Entrega</option>
                       {zonas && zonas.map(zona => {
                       return(
                       <option key={zona.id} value={zona.id}>{zona.nombre}</option>
                       )
                       })}
                   </select>
               </div>
            )
        } else if(metodo_entrega === 'delivery' || preBooking.metodo === 'delivery') {
            return (
                <div className="form-group">
                    <label htmlFor="">Dirección de Recogida</label>
                    <input onChange={(e) => handleAddress(e)} type="text" className="form-control" value={preBooking.direccion_entrega} />
                </div>
            )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setPreBooking({
            ...preBooking,
            hora_entrega: finalTime
        });

        console.log(preBooking);

        props.history.push('/detalle-patinete');
    }

    useEffect(() => {
        setZona(filterZone(lugar));

    }, [lugar, zona, filterZone])

    return (
        <div className="container">
            <div className="wrapper">

                <div className="left">
                    <img src="../images/scooter.jpg" alt=""/>
                </div>

                <div className="panel right">
                    <h2>Entrega el Patinete</h2>
                    <form onSubmit={e => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="">Método de Entrega</label>
                        <select onChange={e => handleMethod(e)} name="metodo_entrega" id="" className="form-control" value={metodo_entrega} required>
                        <option value="">Selecciona un método de entrega</option>
                        <option value="parking_zone">Entrega en Zona de Parqueo</option>
                        <option value="delivery">Entrega a domicilio</option>
                        </select>
                    </div>
                    { renderAddressField() }

                    <ul className="list-unstyled">
                        {lugar != '' && zona &&  metodo_entrega === 'parking_zone' ?
                        <li>
                            <h3>Dirección de Entrega</h3>
                            <p>{zona.direccion}</p>
                        </li>
                        
                        : ''}
                        
                    </ul>

                        <div className="form-group">
                            <label htmlFor="">Hora de Entrega</label>
                            <DatePicker
                                className="form-control"
                                name="hora_entrega"
                                selected={startTime}
                                onChange={e => changeTime(e)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Hora"
                                dateFormat="H:mm"
                                timeFormat="H:mm"
                                minTime={setHours(setMinutes(new Date(), minMinutes), 8)}
                                maxTime={setHours(setMinutes(new Date(), limitMinute),limitHour)}
                            />
                        </div> 

                        <button className="btn btn-primary mb-2 form-control">Continuar</button>

                    </form>
                    <Link to="/zona">Atrás</Link>
                </div>
            </div>
        </div>
    )
}

export default withRouter(DetalleEntrega);