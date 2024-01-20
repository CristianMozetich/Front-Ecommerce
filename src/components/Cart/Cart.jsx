import { useContext, useEffect, useState } from 'react';
import { Context } from '../../utils/ContextProviders';
import { useParams } from 'react-router-dom';

const Cart = () => {
  const { jwt, cartId } = useContext(Context);
  const [cart, setCart] = useState([]);
  const { id } = useParams()

  useEffect(() => {
    const fetchCart = async () => {

      try {
        const response = await fetch(`http://localhost:8090/api/carts/${cartId}`, {
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
  }, [jwt, cartId]);


  const removeFromCart = async () => {
    try{
      const response = await fetch(`http://localhost:8090/api/carts/${cartId}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt} `
        }
      })
      if (response.ok) {
        const data = await response.json();
        console.log(data);
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
      const existingProduct = combinedCart.find((prod) => prod.id_prod.title === product.id_prod.title);

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
      <ul>
        {combinedCart.map((item) => (
          <li key={item.id_prod.title}>
            <p>Producto: {item.id_prod.title}</p>
            <p>Cantidad: {item.quantity}</p>
            <button onClick={removeFromCart}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;




