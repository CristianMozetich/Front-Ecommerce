import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useContext } from 'react';
import { Context } from '../../utils/ContextProviders';
import axios from 'axios'

const CheckoutForm = () => {
  const {cart, cartId, userId} = useContext(Context)

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    // Manejar el resultado de la creación del método de pago (paymentMethod)
    if (!error) {
      const { id } = paymentMethod

      const { data } = await axios.post(`https://backend-coderhouse-b16n.onrender.com/api/carts/${cartId}/purchase`, {
        id,
        code: userId,
        amount: 30000,
      })

      console.log(data)

      elements.getElement(CardElement).clear()

    } else {
      console.log(paymentMethod);
      console.error("Error al crear el método de pago:", error);

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
      <h3>Total: </h3>
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
