import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';



const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    // Manejar el resultado de la creación del método de pago (paymentMethod)
    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod);
      // Aquí puedes realizar acciones adicionales con el resultado del pago
    }
  };

  return (
    <form className='card' onSubmit={handleSubmit}>
      <CardElement />

      <button type="submit">Comprar</button>
    </form>
  );
};

const Checkout = () => {

  const stripePromise = loadStripe('pk_test_51ObSiJHTCFs5XNPn9JpO7VRSPJlMz0yh8PLiuh8LaRdoijMuDX9bt8pIBT1taqeZLfdyWX7o8uDugn4ZEx7cGOPr00opcoGUdO');

  return (
    <div>
      <h1>Este es el Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;
