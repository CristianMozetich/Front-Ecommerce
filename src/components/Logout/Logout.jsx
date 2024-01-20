import React from 'react'

const Logout = () => {


    const handleClick = async (e)=> {
        e.preventDefault()

        try{
            const logout = await fetch('http://localhost:8090/api/sessions/logout', {
                method: 'GET'
            })
    
            if(logout.ok){
                console.log('Usuario deslogueado')
            } else {
                console.error('Hubo un problema al desloguear');
            }
        } catch(error){
            console.error('Error al realizar la solicitud:', error);
        }



    }

  return (
    <div className='m-2 p-2'>
      <button className='btn btn-primary' onClick={handleClick}>Logout</button>
    </div>
  )
}

export default Logout
