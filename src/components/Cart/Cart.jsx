import { useContext, useEffect } from 'react';
import { Context } from '../../utils/ContextProviders';
import { Link } from 'react-router-dom';

import './Cart.css'

const Cart = () => {

  const { jwt, cartId, cart, setCart } = useContext(Context);

  useEffect(() => {
    const fetchCart = async () => {

      try {
        const response = await fetch(`https://backend-coderhouse-b16n.onrender.com/api/carts/${cartId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCart(data.mensaje.products);
        } else {
          console.error('Error al obtener el carrito:', response.status);
        }
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    };

    if (cartId) {
      fetchCart();
    }
  }, [jwt, cartId, setCart, cart]);


  const removeFromCart = async (id_prod) => {
    try{
      const response = await fetch(`https://backend-coderhouse-b16n.onrender.com/api/carts/${cartId}/products/${id_prod}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt} `
        }
      })
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCart((prevCart) => prevCart.filter(item => item.id_prod._id !== id_prod._id));

      }else{
        console.log('Error al eliminar el producto del carrito')
      }
    }catch(error){
      console.error(`Error al eliminar el producto del carrito: ${error}`);
    }
  }
  

  const combineDuplicateProducts = () => {
    const combinedCart = [];

    // Iterar sobre el carrito y combinar productos duplicados
    cart.forEach((product) => {
      const existingProduct = combinedCart.find((prod) => prod._id === product._id);

      if (existingProduct) {
        // Si ya existe un producto con el mismo nombre, sumar las cantidades
        existingProduct.quantity += product.quantity;
      } else {
        // Si no existe, agregar el producto al carrito combinado
        combinedCart.push({ ...product });
      }
    });

    return combinedCart;
  };

  const combinedCart = combineDuplicateProducts();

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <div className='cart'>
        <ul>
          {combinedCart.map((prods) => (
            <li key={prods._id}>
              <p>Producto: {prods.title}</p>
              <p>Cantidad: {prods.quantity}</p>
              <button onClick={ ()=>{console.log(prods.id_prod);removeFromCart(prods.id_prod._id) } }>Eliminar</button>
            </li>
          ))}
        </ul>
        <Link to={'/checkout'} >Finalizar compra</Link>
      </div>
    </div>
  );
};

export default Cart;




