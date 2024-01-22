
const Logout = () => {


    const handleClick = async (e)=> {
        e.preventDefault()

        try{
            const logout = await fetch('https://backend-coderhouse-b16n.onrender.com/api/sessions/logout', {
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
