import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../utils/ContextProviders';
import { useNavigate } from 'react-router-dom'
import './ProductDetails.css'


const ProductDetails = () => {

  const navigate = useNavigate()
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const { jwt, cartId, setCartId, decodeToken } = useContext(Context);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [loginMensaje, setLoginMensaje] = useState('')


  const addToCart = async () => {

    if(!jwt){
      setLoginMensaje('Debe iniciar sesión para comprar productos')
    }

    
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

        setTotal( total + productDetails.price * quantity ) ;


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
    <div className='card_details'>
      <h1>Detalles del producto</h1>
      <h2>{productDetails.title}</h2>
      {Array.isArray(productDetails.thumbnails) && productDetails.thumbnails.length > 0 && (
            <img src={`${productDetails.thumbnails[0].path}`} alt={productDetails.title} />
      )}
      <p>{productDetails.description}</p>
      <p>${productDetails.price}</p>

      <label htmlFor="quantity">Cantidad:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        min={1}
        max={10}
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
      />
      <p>Total: ${ productDetails.price * quantity }</p>
        {
        loginMensaje && <h4 className="login_mensaje">{loginMensaje}</h4>
        }
      <button className='btn btn-primary m-2' onClick={addToCart}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductDetails;



