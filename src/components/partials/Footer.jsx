import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';



export const Footer = () => {

  return (

    <div className="footer__container">
        
   

        <ul className="footer__navbar">
            
            {/* Menues OPCIONALES, agregar o quitar los necesarios */}

            <Link to="/tendenciaDiaria"><li className="footer__navbar_button">Tendencia Hoy</li></Link>
            <Link to="/tendenciaSemanal"><li className="footer__navbar_button">Tendencia Semanal</li></Link>
            <Link to="/cartelera"><li className="footer__navbar_button">En Cartelera</li></Link>
            <Link to="/estrenos"><li className="footer__navbar_button">Proximos Estrenos</li></Link>
            <Link to="/topRankin"><li className="footer__navbar_button">Mejores Puntuadas</li></Link>

        </ul>

    </div>
  )
}