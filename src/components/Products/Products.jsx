import { useEffect, useState } from 'react'
import './Products.css'
import { Link } from 'react-router-dom'

const Products = () => {

  const [products, setProducts] = useState([])

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



  return (
    <div className='products'>
      <div className='container_title'>      
        <h1 className='title'>Productos</h1>
      </div>
      <div className='prodContainer'>
      {
      products.map((prod) => (
          <div className='card_prod text-white' key={prod._id}>
            {/* Verifica que prod.thumbnails sea un array y tenga al menos una imagen */}
            {Array.isArray(prod.thumbnails) && prod.thumbnails.length > 0 && (
            <img className='img_card' src={`https://backend-coderhouse-b16n.onrender.com/api/users/images/${prod.thumbnails[0].filename}`} alt={prod.title} />
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
