import { useRef } from 'react'
import { getCookies } from '../../utils/formsUtils.js'
import './NewProducts.css'



const NewProducts = () => {

  const formRef = useRef(null)



  const handleSubmit = async (e)=>{
    e.preventDefault()

    const dataForm = new FormData(formRef.current)
    const data = Object.fromEntries(dataForm)

    const token = getCookies('jwtCookies')


    const response = await fetch('http://localhost:8090/api/products',{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token} `,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if(response.status === 201){
      const datos = await response.json()
      console.log(datos)
    }

  }


  return (
    <div className='createProd container text-center'>
      <h2 className='m-2 p-3'>Crear Nuevos Productos</h2>
       <form onSubmit={handleSubmit} ref={formRef}>

          <div className="mb-3">
            <label htmlFor="title" className="form-label m-2">Title</label>
            <input type="text" id="title" className="title" placeholder="Title" name='title' />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label m-2">Description</label>
            <input type="text" id="description" className="description" placeholder="Description" name='description' />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label m-2">Price</label>
            <input type="number" id="price" className="price" placeholder="Price" name='price' />
          </div>

          <div className="mb-3">
            <label htmlFor="stock" className="form-label m-2">Stock</label>
            <input type="number" id="stock" className="stock" placeholder="Stock" name='stock' />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label m-2">Category</label>
            <input type="text" id='category' className='category' placeholder='Category' name='category'  />
            
          </div>

          <div className="mb-3">
            <label htmlFor="code" className="form-label m-2">Code</label>
            <input type="text" id='code' className='code' placeholder='Code' name='code'  />
            
          </div>

          <button type="submit" className="btn btn-primary m-2 p-2">Crear Producto</button>

      </form>
      
    </div>
  )
}

export default NewProducts