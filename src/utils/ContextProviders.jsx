import { useState, createContext } from "react";
import jwt_decode from 'jwt-decode';


export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [cartId, setCartId] = useState('');
  const [jwt, setJwt] = useState('');
  const [cart, setCart] = useState([]);

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
    <Context.Provider value={{ userId, setUserId, cartId, setCartId, jwt, setJwt, decodeToken, cart, setCart }}>
      {children}
    </Context.Provider>
  );
};




export default ContextProvider;

