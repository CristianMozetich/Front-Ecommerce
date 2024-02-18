import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
        <div className='home_desc'>
          <img className="img_home" src="/img/simple.webp" alt="mates" />
          <h1 className='titulo'>Simple</h1>
          <Link to={"/login"} ><button className='btn btn-dark m-2'>Login</button></Link>
          <Link to={"/register"} ><button className='btn btn-dark m-2'>Registro</button></Link>
        </div>
    </div>
  )
}

export default Home
