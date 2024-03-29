import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../utils/ContextProviders'
import './Products.css'
import Filters from '../Filters/Filters'


const Products = () => {
  const [products, setProducts] = useState([])
  const { filteredProducts } = useContext(Context)

  useEffect(() => {
    fetch('https://backend-coderhouse-b16n.onrender.com/api/products', {
      method: 'GET'
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.docs)
      setProducts(data.docs)
    } )
    .catch((error) => console.log(`error al obtener datos${error}`))
  }, [])


  const productosFiltrados = filteredProducts({ products });

  return (
    <div className='products'>
      <div className='container_title'>      
        <h1 className='title'>Productos</h1>
      </div>
    <Filters/>
      <div className='prodContainer'>
      {
      productosFiltrados.map((prod) => (
          <div className='card_prod text-white' key={prod._id}>
            {/* Verifica que prod.thumbnails sea un array y tenga al menos una imagen */}
            {Array.isArray(prod.thumbnails) && prod.thumbnails.length > 0 && (
            <img className='img_card' src={`${prod.thumbnails[0].path}`} alt={prod.title} />
            )}
            <div className='card_footer'>
              <h4 className='text-center'>{prod.title}</h4>
              <h5>$ {prod.price}</h5>
            </div>
            <Link to={`/products/${prod._id}`}><button className='btn btn-dark'>Detalles</button></Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
 