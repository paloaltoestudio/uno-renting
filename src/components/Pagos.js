import React, { useContext, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_MQVSk4TjwXbH6jhCiKL7kDLc002tjZpivx');

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if(!error){
            console.log(paymentMethod)
        }
    }
    return(
        <form onSubmit={handleSubmit} className="card card-body">
            <div className="form-group">
                <CardElement className="form-control" />
            </div>
            <button className="form-control" disabled={!stripe}>Paga tu reserva</button>
        </form>
    )
}

const Pagos = (props) => {

    return(
        <div className="container">
            <div className="wrapper">
                <div className="left">
                    <img src="../images/scooter.jpg" alt=""/>
                </div>

                <div className="panel right scooter_detail">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>   
            </div>
        </div>
    )

}

export default Pagos;