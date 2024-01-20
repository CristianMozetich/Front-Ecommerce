import { useEffect, useState } from 'react'
import './Products.css'
import { Link } from 'react-router-dom'

const Products = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:8090/api/products', {
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
    <div className='text-center'>
      <h2>Productos</h2>
      <div className='d-flex flex-wrap col-sm-8 m-auto'>
      {
      products.map((prod) => (
          <div className='card' key={prod._id}>
            <h3>{prod.title}</h3>
            <p>{prod.description}</p>
            <p>Precio: ${prod.price}</p>
            <p>Stock: {prod.stock}</p>
            <p>Categoría: {prod.category}</p>
            <Link to={`/products/${prod._id}`} className='btn btn-primary'>Detalles</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
