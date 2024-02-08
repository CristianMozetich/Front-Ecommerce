import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Logout from '../Logout/Logout.jsx'
import { useContext } from 'react'
import { Context } from '../../utils/ContextProviders.jsx'
import './Login.css'



const Login = () => {

const formRef = useRef(null)
const navigate = useNavigate()
const { setJwt, setUserId, setCartId, decodeToken } = useContext(Context)

const handleSubmit = async (e) =>{
  e.preventDefault()


  const dataForm = new FormData(formRef.current) //transformo html en un objeto de js
  const data = Object.fromEntries(dataForm)


  const response = await fetch('https://backend-coderhouse-b16n.onrender.com/api/sessions/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(response.status == 200){
    const datos = await response.json()
    setJwt(datos.token)

    const tokenDecodificado = decodeToken(datos.token)

    setUserId(tokenDecodificado.user._id)
    setCartId(tokenDecodificado.user.cart)

    document.cookie = `jwtCookies =${datos.token}; expires=${new Date(Date.now() + 1 * 24 * 60 * 1000).toUTCString()}; path=/;`
    

    navigate('/products')

  } else{
    console.log(response)
  }


  console.log(response)
}

  return (
    <div className='login container text-center'>
      <h2 className='m-2 p-3'>Login</h2>
       <form onSubmit={handleSubmit} ref={formRef}>


          <div className="mb-3">
            <label htmlFor="email" className="form-label m-2">Email</label>
            <input type="email" id="email" className="form-email" placeholder="Email" name='email' />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label m-2">Password</label>
            <input type="text" id='password' className='form_password' placeholder='Password' name='password'  />
            
          </div>

          <button type="submit" className="btn btn-primary">Login</button>
          <Logout/>

      </form>
      
    </div>
  )
}


export default Login
