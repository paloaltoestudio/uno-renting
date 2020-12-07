import React, { useState, useEffect ,useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import cc from '@genyus/country-code';

import { PreBookingContext } from '../contexts/PreBookingContext';


const stripePromise = loadStripe('pk_test_MQVSk4TjwXbH6jhCiKL7kDLc002tjZpivx');

const CheckoutForm = props => {

    const stripe = useStripe();
    const elements = useElements();

    const { preBooking } = useContext(PreBookingContext);

    useEffect(() => {
        if(preBooking.conductores_patinetes['conductor_1']){
            const firstDriver = preBooking.conductores_patinetes['conductor_1'].nombre;
            setBillingDetails({
                ...billingDetails,
                name: firstDriver
            })
        }
    }, [])

    const [places, setPlaces] = useState({
        country: '',
        region: ''
    })
    
    const [billingDetails, setBillingDetails] = useState({
        email: '',
        phone: '',
        name: '',
        address: ''
    });

    const selectCountry = val => {
        setPlaces({ ...places, country: val });

        // Grab country object from @genyus/country-code
        const countryInfo = cc.find({ name: val })

        // Grab country code from @genyus/country-code country object
        const countryCode = countryInfo.alpha2;

        setBillingDetails ({
            ...billingDetails,
            address: {...billingDetails.address, country: countryCode}
        });
      }
     
    const selectRegion = val => {
        setPlaces({ ...places, region: val });

        setBillingDetails ({
            ...billingDetails,
            address: {...billingDetails.address, state: val}
        });
    }

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState();

    const handleChange = e => {
        
        console.log(e.target.name, e.target.value)

        if(e.target.name === 'line1'){
            setBillingDetails ({
                ...billingDetails,
                address: {...billingDetails.address, [e.target.name]: e.target.value}
            }); 
        } else if(e.target.name === 'city'){
            setBillingDetails ({
                ...billingDetails,
                address: {...billingDetails.address, [e.target.name]: e.target.value}
            }); 
        } else {
            setBillingDetails ({
                ...billingDetails,
                [e.target.name]: e.target.value
            });
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        setProcessing(true);
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: billingDetails,
        })

        if(!error){
            console.log(paymentMethod);
            setError();
        } else {
            console.log(error);
            setError(error);
        }

        console.log(preBooking)

        setProcessing(false);
    }

    return(
        <form onSubmit={handleSubmit} className="card card-body">
            <div className="form-group">
                <div className="form-group">
                    <input type="text" onChange={e => handleChange(e)} className="form-control" name="name" placeholder="Nombre" value={billingDetails.name} required />
                </div>
                <div className="form-group">
                    <input type="email" onChange={e => handleChange(e)} className="form-control" name="email" placeholder="Email" required />
                </div>
                <div className="form-group">
                    <input type="text" onChange={e => handleChange(e)} className="form-control" name="phone" placeholder="Móvil" required />
                </div>
                <div className="form-group">
                    <CountryDropdown
                      className="form-control"
                      value={places.country}
                      onChange={(val) => selectCountry(val)} />
                </div>
                <div className="form-group">
                <RegionDropdown
                      className="form-control"
                      country={places.country}
                      value={places.region}
                      onChange={(val) => selectRegion(val)} />
                </div>
                <div className="form-group">
                    <input type="text" onChange={e => handleChange(e)} className="form-control" name="city" placeholder="Ciudad" required />
                </div>
                <div className="form-group">
                    <input type="text" onChange={e => handleChange(e)} className="form-control" name="line1" placeholder="Dirección" required />
                </div>
                
                {error ? 
                    <p className="text-danger">{error.message}</p>
                    : ''
                }   
                <CardElement className="form-control" />
            </div>
            <button className="form-control link pay" disabled={!stripe}>
                {!processing ?
                'Paga tu reserva'
                : (
                    <div className="spinner-border spinner-border-sm text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                  )
                }
            </button>
        </form>
    )
}

const Pagos = props => {

    const {user} = props;

    return(
        <Elements stripe={stripePromise}>
            <CheckoutForm user={user} />
        </Elements>
    )

}

export default Pagos;