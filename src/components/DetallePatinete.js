import React, {useContext, useState, useEffect} from 'react';
import { withRouter, Link } from 'react-router-dom';
import { PreBookingContext } from '../contexts/PreBookingContext';

const DetallePatinete = (props) => {

    const { preBooking, setPreBooking } = useContext(PreBookingContext);
    const [ drivers, setDrivers ] = useState([]);

    const handleChange = (e) => {
        console.log(e.target.name)
        setDrivers([
            {nombre_conductor: e.target.value}
        ]);

        console.log(drivers);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        props.history.push('/checkout');
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
                            <div className="form-group">
                                <label>Conductor 1</label>
                                <input onChange={handleChange} type="text" name="driver_1" className="form-control" required />
                            </div>
                            <div class="form-check">
                              <input type="checkbox" class="form-check-input" id="acceptance_1" required />
                              <label className="form-check-label" for="acceptance_1">Es mayor de 16 años</label>
                            </div>
                            <div className="form-group">
                                <label>Conductor 2</label>
                                <input onChange={(e) => handleChange(e)} type="text" className="form-control" required />
                            </div>
                            <div class="form-check">
                              <input type="checkbox" class="form-check-input" id="acceptance_2" required />
                              <label className="form-check-label" for="acceptance_2">Es mayor de 16 años</label>
                            </div>
                            <div className="form-group">
                                <label>Conductor 3</label>
                                <input onChange={handleChange} type="text" className="form-control" required />
                            </div>
                            <div class="form-check">
                              <input type="checkbox" class="form-check-input" id="acceptance_3" required />
                              <label className="form-check-label" for="acceptance_3">Es mayor de 16 años</label>
                            </div>

                        <button className="btn btn-primary mb-2 form-control">Continuar</button>
                    </form>

                    <Link to="/entrega">Atrás</Link>
                </div>
            </div>
        </div>    
    )
}

export default withRouter(DetallePatinete);