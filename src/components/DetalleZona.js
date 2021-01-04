import React, {useContext, useState, useEffect} from 'react';
import { withRouter, Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { LanguageContext } from '../contexts/LanguageContext';
import { PreBookingContext } from '../contexts/PreBookingContext';
import { ZoneContext } from '../contexts/ZoneContext';
import { DirectionContext } from '../contexts/DirectionContext';
import { motion } from 'framer-motion';
import { containerVariant } from './variants';

const DetalleZona = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { transl } = useContext(LanguageContext);
    const { preBooking, setPreBooking } = useContext(PreBookingContext);
    const { isForward, setIsForward } = useContext(DirectionContext);

    const zonaId = preBooking.zona_id;
    const { filterZone } = useContext(ZoneContext);

    console.log(preBooking);

    // Get updated zone info
    const zona = filterZone(zonaId);

    const [zonaState, setZonaState] = useState(preBooking);
    const {residente, tiempo, numero_cargadores, numero_patinetes, fecha_recogida, hora_recogida} = zonaState;

    const [itemsChargers, setItemsChargers] = useState([]);

    const chargersOptions = (n) => {
        setItemsChargers([]);
        let numChargers = [];

        for ( let i = 0; i <= n; i++) {
            numChargers.push(<option key={i} value={i}>{i}</option>)
        }
        setItemsChargers(numChargers);
    }

    useEffect(() => {
        if(numero_patinetes){
            chargersOptions(numero_patinetes);
        }

        if(numero_patinetes && zona && numero_patinetes > zona.patinetes){
            setZonaState({
                ...preBooking,
                numero_patinetes: 0
            });
        }

    }, [numero_patinetes]);
    

    const handleChange = (e) => {
        setZonaState({
            ...zonaState,
            [e.target.name]: e.target.value
        });

        setPreBooking({
            ...preBooking,
            [e.target.name]: e.target.value
        });

        if(e.target.name === 'numero_patinetes'){
            setPreBooking({
                ...preBooking,
                'numero_cargadores': e.target.value,
                'numero_patinetes': e.target.value
            }); 
        }
    }
        
    const [dateInfo, setDateInfo] = useState({
        startDate: new Date()
      });

    const [{startTime}, setStartTime] = useState({
        startTime: new Date()
    });

    const changeState = (date) => {

        const dateBooking = date.getDate() + '/' + (date.getMonth()+1);

        setDateInfo({
            startDate: date
        })

        setZonaState({
            ...zonaState,
            fecha_recogida: dateBooking
        })

        setPreBooking({
            ...preBooking,
            fecha_recogida: dateBooking
        })
    }

    const changeTime = (time) => {

        const startHour = time.getHours() + ':' + (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
        
        setStartTime({
            startTime: time
        });

        setZonaState({
            ...zonaState,
            hora_recogida: startHour
        });

        setPreBooking({
            ...preBooking,
            hora_recogida: startHour
        })
    }

    const items = [];
    const scooterNumberOptions = () => {
        if(preBooking.direccion){

            const max = zona ? zona.patinetes + 1 : 10;

            for ( let i = 0; i < max; i++) {
                if(i > 0) items.push(<option key={i} value={i}>{i}</option>)
            }
            return items;
        } else {
            props.history.push('/');
        }
    }

    scooterNumberOptions();


    // Calculate price
    let { precio } = preBooking;
    precio = (tiempo * 10) * numero_patinetes;

    useEffect(() => {
        setPreBooking({
            ...preBooking,
            precio
        })

        console.log(precio)
    }, [precio])


    const handleSubmit = e => {
        e.preventDefault();

        //let hour = hora_recogida.split(':');
        //hour[0] = Number(hour[0]) + Number(tiempo);
        //onst hora_entrega = hour.join(':')

        setPreBooking({
            ...preBooking,
            residente,
            tiempo,
            numero_cargadores: preBooking.numero_patinetes, 
            numero_patinetes, 
            fecha_recogida, 
            hora_recogida
        });

        setIsForward(true);

        console.log(preBooking);

        props.history.push('/entrega');
    }

    const backLink = e => {
        e.preventDefault();
        props.history.push('/');
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

                <div className="panel right">

             

            <ul className="list-unstyled">
            {zona ?
                <li>
                    <h3>Lugar de Recogida</h3>
                    <p>{zona.nombre}</p>
                </li> 
            : '' } 

                <li>
                    <h3>Dirección de Recogida</h3>
                    <p>{preBooking.direccion}</p>
                </li>   
            </ul>

            

            <div className="form-home">
                <form onSubmit={(e) => handleSubmit(e)} className="text-left">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label className="small" htmlFor="">Residente de Barcelona</label>
                                
                                <select onChange={(e) => handleChange(e)} name="residente" id="" className="form-control" value={residente} required >
                                    <option value="">Responde</option>
                                    <option value="no">No</option>
                                    <option value="si">Sí</option>
                                </select>
                            </div>
                        </div>
                        
                        

                        <div className="col-sm-4">
                            <div className="form-group">
                                <label className="small" htmlFor="">Tiempo de Reserva</label>
                                <select onChange={(e) => handleChange(e)} name="tiempo" id="" className="form-control" value={tiempo} required>
                                    <option value="">Selecciona el tiempo</option> 
                                    <option value="1">1 día</option> 
                                    <option value="2">2 días</option> 
                                    <option value="4">4 días</option> 
                                    <option value="6">6 días</option> 
                                    <option value="8">8 días</option> 
                                </select>
                            </div> 
                        </div>

                        <div className="col-sm-4">
                            <div className="form-group">
                                <label className="small" htmlFor="">Fecha de Recogida</label>
                                <DatePicker 
                                    className="form-control"
                                    name='fecha_recogida'
                                    selected={dateInfo.startDate} 
                                    onChange={date => changeState(date)} 
                                    dateFormat="MMMM d, yyyy"
                                    value={fecha_recogida} 
                                    required   
                                />
                            </div> 
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <label className="small" htmlFor="">Hora de Recogida</label>
                                <DatePicker
                                className="form-control"
                                name="hora_recogida"
                                selected={startTime}
                                onChange={time => changeTime(time)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Hora"
                                dateFormat="H:mm"
                                timeFormat="H:mm"
                                value={hora_recogida}
                                minTime={setHours(setMinutes(new Date(), 0), 8)}
                                maxTime={setHours(setMinutes(new Date(), 0), 22)}
                                required
                                />
                            </div> 
                        </div>


                        { tiempo && fecha_recogida && hora_recogida ?  
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ type: 'spring', stiffness: 90 }}
                            className="col-sm-8"
                        >
                            <div className="form-group">
                                <label className="small" htmlFor="">Número de Patinetes</label>
                                
                                <select onChange={(e) => handleChange(e)} name="numero_patinetes" id="" className="form-control" value={numero_patinetes} required >
                                    <option value="">Selecciona el número</option> 
                                    { items }
                                </select>
                            </div> 
                        </motion.div>
                        : ''
                        }
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, fontSize: 0, y: 30 }}
                        animate={{ opacity: 1, fontSize: 20, y: 0 }} 
                        transition={{ type: 'spring', stiffness: 90 }}
                        className="price"
                    >
                        <p>Tarifa { precio } €</p>
                    </motion.div>

                    <button className="btn btn-primary mb-2 form-control">{transl('Continuar')} <i className="fas fa-chevron-right"></i></button>
                </form>
            </div>

            <a href="#" className="back_btn" onClick={(e) => backLink(e)} to="/">
                <i className="fas fa-chevron-left"></i>
                Atrás
            </a>
            </div>
        </div>
    </motion.div>
   
    )
    
}

export default withRouter(DetalleZona);