import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';



export const Footer = () => {

  return (

    <footer>
      <div className="app_container footer__container">
        
          <nav className="footerNavbar">
            <ul>
              <li><Link to="/tendenciaDiaria">Tendencia Hoy</Link></li>
              <li><Link to="/tendenciaSemanal">Tendencia Semanal</Link></li>
              <li><Link to="/cartelera">En Cartelera</Link></li>
              <li><Link to="/estrenos">Proximos Estrenos</Link></li>
              <li><Link to="/topRankin">Mejores Puntuadas</Link></li>
            </ul>
          </nav>

      </div>
    </footer>

    // <footer className="footer">
    //   <div className="app_container footer__container">
    //     <nav className="footer__nav shift">
    //       <ul className="footer__ul">
    //         <li className="footer__li"><Link to="/tendenciaDiaria" className="footer__link">Tendencia Hoy</Link></li>
    //         <li className="footer__li"><Link to="/tendenciaSemanal" className="footer__link">Tendencia Semanal</Link></li>
    //         <li className="footer__li"><Link to="/cartelera" className="footer__link">En Cartelera</Link></li>
    //         <li className="footer__li"><Link to="/estrenos" className="footer__link">Proximos Estrenos</Link></li>
    //         <li className="footer__li"><Link to="/topRankin" className="footer__link">Mejores Puntuadas</Link></li>
    //       </ul>
    //     </nav>
    //   </div>
    // </footer>
  )
}