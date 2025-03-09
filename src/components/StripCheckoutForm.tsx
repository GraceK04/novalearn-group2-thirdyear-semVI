

import  { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements }from '@stripe/react-stripe-js';

// Stripe ကို initialize လုပ်ပါ
const stripePromise = loadStripe('pk_test_51QvGzsQZlOkfmuioKfHf1JaCSYKRcIL6Egpea5AOXR8msCqdcyliXt531oGcaQooJccWp972bZUU07I85yyNaid2009NzLq9qv');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setpaymentMethod] = useState(null);

    const handleSubmit =  (event)=>{
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        }).then(
            result => {
                console.log(result.paymentMethod);
                setpaymentMethod(result.paymentMethod);
            }
        ).catch(error =>setError(error));

        if (error) {
            setLoading(false);
        } else {
            console.log('PaymentMethod:', paymentMethod);
            setLoading(false);
            // Call server-side code to confirm the payment
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

const StripeCheckout = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default StripeCheckout;