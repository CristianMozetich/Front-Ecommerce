import { useRef, useState, useEffect, useContext } from 'react'
import { getCookies } from '../../utils/formsUtils.js'
import { Context } from '../../utils/ContextProviders.jsx';
import './NewProducts.css'




const NewProducts = () => {
  const [userProfileImgUrl, setUserProfileImgUrl] = useState(null);
  const { jwt, decodeToken } = useContext(Context) 



    useEffect(() => {
      const fetchPerfilUser = async () => {
        try {
          const infoToken = decodeToken(jwt);
          const documents = infoToken.user.documents;
    
          if (Array.isArray(documents) && documents.length > 0) {
            const imagePath = documents[0].path;
            const token = getCookies('jwtCookies');
            const response = await fetch(`${imagePath}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
    
            if (response.ok) {
              const imageData = await response.blob();
              const imageUrl = URL.createObjectURL(imageData);
              setUserProfileImgUrl(imageUrl);
            } else {
              console.error('Error al cargar la imagen:', response.status);
            }
          } else {
            console.error('El token no contiene documentos de usuario.');
          }
        } catch (error) {
          console.error('Error al obtener la imagen de perfil:', error);
        }
      };
    
      fetchPerfilUser();
    }, [jwt, decodeToken]);
    

  const formRef = useRef(null)



  const handleSubmit = async (e)=>{
    e.preventDefault()

    const dataForm = new FormData(formRef.current)
    const data = Object.fromEntries(dataForm)

    const token = getCookies('jwtCookies')


    const response = await fetch('https://backend-coderhouse-b16n.onrender.com/api/products',{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token} `,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if(response.status === 201){
      const datos = await response.json()
      console.log(datos)


      const prodId = datos._id;
      const imageForm = new FormData();
      const productImage = document.getElementById('productImage').files[0];
      imageForm.append('productImage', productImage);

      const uploadImageResponse = await fetch(`https://backend-coderhouse-b16n.onrender.com/api/users/${prodId}/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: imageForm
      });

      if (uploadImageResponse.status === 200) {
        const uploadedImageData = await uploadImageResponse.json();
        console.log('Imagen del producto cargada exitosamente:', uploadedImageData);

        
        formRef.current.reset(); 
      }
    }

  }


  return (
    <>
    <div className='admin_panel'>
    <h1 className='m-2 p-3'>Panel Admin</h1>
    {
      userProfileImgUrl && <img className='imgPerfil' src={userProfileImgUrl} alt="perfil" />
    }
    </div>
    <h2 className='m-2 text-center'>Crear Nuevos Productos</h2>
    <div className='createProd container text-center'>
       <form onSubmit={handleSubmit} ref={formRef}>

          <div className="mb-3">
            <label htmlFor="title" className="form-label m-2">Title</label>
            <input type="text" id="title" className="title_new_product" placeholder="Title" name='title' />
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

          <div className="mb-3">
          <label htmlFor="productImage" className="form-label m-2">Imagen del Producto</label>
          <input type="file" id="productImage" name="productImage" accept="image/*" />
        </div>

          <button type="submit" className="btn btn-primary m-2 p-2">Crear Producto</button>

      </form>
      
    </div>
    </>
  )
}

export default NewProducts
