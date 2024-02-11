import { useState, createContext } from "react";
import jwt_decode from 'jwt-decode';


export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [cartId, setCartId] = useState('');
  const [jwt, setJwt] = useState('');
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  const filteredProducts = ({ products }) => {
    return products.filter(prod => {
      return (
        prod.price >= filters.minPrice &&
        (filters.category === 'all' || prod.category === filters.category)
      )
    })
  }

  const decodeToken = (token) => {
    try {
      // Decodificar el token utilizando jwt-decode u otra implementación
      const decodedToken = jwt_decode(token);
  
      // Devolver la información decodificada
      return decodedToken;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  };

  return (
    <Context.Provider value={{ userId, setUserId, cartId, setCartId, jwt, setJwt, decodeToken, cart, setCart, setFilters, filteredProducts, filters }}>
      {children}
    </Context.Provider>
  );
};




export default ContextProvider;

