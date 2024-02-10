import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
        <div className='home_desc'>
          <div className='home_desc2'>
            <h1 className='titulo'>Santa Rita</h1>
            <p className='desc'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae unde voluptate, laudantium reprehenderit quia animi?</p>
            <Link to={"/login"} ><button className='btn btn-dark'>Login</button></Link>
            <Link to={"/register"} ><button className='btn btn-dark'>Registro</button></Link>
          </div>
          <img className="img_home" src="/img/weed.jpeg" alt="mates" />
        </div>
    </div>
  )
}

export default Home
