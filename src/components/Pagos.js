import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_MQVSk4TjwXbH6jhCiKL7kDLc002tjZpivx');

const CheckoutForm = props => {

    const stripe = useStripe();
    const elements = useElements();

    const {user} = props;

    const [billingDetails, setBillingDetails] = useState({
        email: user.email,
        phone: user.phone,
        name: user.name,
    });

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState();


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

        setProcessing(false);
    }
    return(
        <form onSubmit={handleSubmit} className="card card-body">
            <div className="form-group">
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
                    <div class="spinner-border spinner-border-sm text-light" role="status">
                        <span class="sr-only">Loading...</span>
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