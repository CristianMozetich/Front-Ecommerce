import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../utils/ContextProviders';
import { useNavigate } from 'react-router-dom'


const ProductDetails = () => {

  const navigate = useNavigate()
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const { jwt, cartId, setCartId, decodeToken } = useContext(Context);
  const [quantity, setQuantity] = useState(0);


  const addToCart = async () => {

    const tokenDecodificado = decodeToken(jwt);
    setCartId(tokenDecodificado.user.cart);

    try {
      const response = await fetch(`https://backend-coderhouse-b16n.onrender.com/api/carts/${cartId}/products/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify({
          quantity: quantity,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)


      } else {
        console.log('Error al agregar el producto al carrito');
      }

      navigate(`/carts/${cartId}`)

    } catch (error) {
      console.error(`Error al agregar el producto al carrito: ${error}`);
    }
  };

  useEffect(() => {
    fetch(`https://backend-coderhouse-b16n.onrender.com/api/products/${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductDetails(data);
      })
      .catch((error) => console.log(`Error al obtener detalles del producto: ${error}`));
  }, [id, jwt]);

  return (
    <div>
      <h1>Detalles del producto</h1>
      <h2>{productDetails.title}</h2>
      <p>${productDetails.price}</p>
      <p>{productDetails.description}</p>

      <label htmlFor="quantity">Cantidad:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
      />
      
      <button className='btn btn-primary m-2' onClick={addToCart}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductDetails;



