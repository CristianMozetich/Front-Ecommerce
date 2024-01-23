import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useContext } from 'react';
import { Context } from '../../utils/ContextProviders';

const CheckoutForm = () => {
  const {cart} = useContext(Context)

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
      {
        cart.map((prods) => (
          <div key={prods.id_prod.title}>
              <p>Producto: {prods.id_prod.title}</p>
              <p>Cantidad: {prods.quantity}</p>
          </div>
        ))
      }
      <CardElement />
      <button type="submit">Comprar</button>
    </form>
  );
};

const Checkout = () => {

  const stripePromise = loadStripe('pk_test_51ObSiJHTCFs5XNPn9JpO7VRSPJlMz0yh8PLiuh8LaRdoijMuDX9bt8pIBT1taqeZLfdyWX7o8uDugn4ZEx7cGOPr00opcoGUdO');

  return (
      <Elements stripe={stripePromise}>
        <CheckoutForm/>
      </Elements>
  )
}

export default Checkout;
