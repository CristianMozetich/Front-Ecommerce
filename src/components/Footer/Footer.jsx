import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-info'>
        <h2>Contacto</h2>
        <p>Dirección: 123 Calle Principal, Ciudad</p>
        <p>Teléfono: (123) 456-7890</p>
        <p>Email: info@tuempresa.com</p>
      </div>
      
      <div className='social-media'>
        <a href='https://www.instagram.com/tuempresa' target='_blank' rel='noopener noreferrer'>
          <i className='fa-brands fa-instagram'></i> Instagram
        </a>
        <a href='https://www.facebook.com/tuempresa' target='_blank' rel='noopener noreferrer'>
          <i className='fa-brands fa-facebook'></i> Facebook
        </a>
        <a href='https://api.whatsapp.com/send?phone=1234567890' target='_blank' rel='noopener noreferrer'>
          <i className='fa-brands fa-whatsapp'></i> WhatsApp
        </a>
      </div>

      <div className='newsletter'>
        <h2>Newsletter</h2>
        <p>Suscríbete a nuestro boletín para recibir noticias y ofertas especiales.</p>
        <form>
          <input type='email' placeholder='Tu correo electrónico' />
          <button type='submit'>Suscribirse</button>
        </form>
      </div>
    </div>
  );
};

export default Footer;

