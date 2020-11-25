import React, {useContext, useState, useEffect} from 'react';
import { withRouter, Link } from 'react-router-dom';
import { PreBookingContext } from '../contexts/PreBookingContext';

const DetallePatinete = (props) => {

    const { preBooking, setPreBooking } = useContext(PreBookingContext);
    const [ drivers, setDrivers ] = useState([]);

    const handleChange = (e) => {
        const field = e.target.name;
        drivers[field] = { nombre: e.target.value}
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setDrivers([
            ...drivers
        ])

        setPreBooking(
            {
                ...preBooking,
                conductores_patinetes: drivers
            }
        )
        console.log(drivers)

        props.history.push('/checkout');
    }
    

    // Fieldset for drivers based on scooter amount
    const driversFields = [];
    const driversAmount = Number(preBooking.numero_patinetes);
    let i;
    
    for( i = 1; i < driversAmount + 1 ; i++){

        driversFields.push(
            <div>
                <div className="form-group">
                    <label>Conductor {i}</label>
                    <input onChange={handleChange} type="text" name={'conductor_' + i} className="form-control" required />
                </div>
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id={'acceptance_' + i} required />
                  <label className="form-check-label" for={'acceptance_' + i}>Es mayor de 16 años</label>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="wrapper">
                <div className="left">
                    <img src="../images/scooter.jpg" alt=""/>
                </div>

                <div className="panel right scooter_detail">
                    <h3>Patinetes</h3>
                    <p>Por favor ingresa el conductor de cada patinete</p>

                    <form onSubmit={(e) => {handleSubmit(e)}}>
                            
                        { driversFields }

                        <button className="btn btn-primary mb-2 form-control">Continuar</button>
                    </form>

                    <Link to="/entrega">Atrás</Link>
                </div>
            </div>
        </div>    
    )
}

export default withRouter(DetallePatinete);