import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
        <div className='home_desc'>
          <img className="img_home" src="/img/simple.webp" alt="mates" />
          <h1 className='titulo'>SIMPLE</h1>
          <Link className='loginbtn' to={"/login"}>LOGIN</Link>
          <Link className='register' to={"/register"}>REGISTRARME</Link>
        </div>
    </div>
  )
}

export default Home
