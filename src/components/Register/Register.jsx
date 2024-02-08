import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'


const Register = () => {

  const formRef = useRef(null)
  const navigate = useNavigate()    

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const dataForm = new FormData(formRef.current)
    const data = Object.fromEntries(dataForm)

    const response = await fetch('http://localhost:8090/api/sessions/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if(response.status == 200){
      const datos = await response.json()
      console.log(datos)
      navigate('/login')

    }
  }


  return (
    <div className='formulario container text-center'>
      <h2 className='m-2 p-3'>Registro</h2>
       <form onSubmit={handleSubmit} ref={formRef}>

          <div className="mb-3">
            <label htmlFor="first_name" className="form-label m-2">Nombre</label>
            <input type="text" id="first_name" className="form-name" placeholder="Nombre" name='first_name' />
          </div>

          <div className="mb-3">
            <label htmlFor="last_name" className="form-label m-2">Apellido</label>
            <input type="text" id="last_name" className="form-surname" placeholder="Apellido" name='last_name' />
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label m-2">Edad</label>
            <input type="text" id="age" className="form-edad" placeholder="Edad" name='age' />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label m-2">Email</label>
            <input type="email" id="email" className="form-email" placeholder="Email" name='email' />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label m-2">Password</label>
            <input type="text" id='password' className='form_password' placeholder='Password' name='password'  />
            
          </div>

          <button type="submit" className="btn btn-primary m-2 p-2">Registrarse</button>

      </form>
      
    </div>
  )
}

export default Register
