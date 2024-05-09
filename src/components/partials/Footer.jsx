import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';



export const Footer = () => {

  return (

    <div className="footer__container">
        
        {/* Leyenda que indica que componente es, Esto se BORRA */}
        {/* <span style={{fontSize: '.8rem', color: '#4c4c4c'}}>GRIS: Componente Footer</span> */}

        <ul className="footer__navbar">
            
            {/* Menues OPCIONALES, agregar o quitar los necesarios */}

            <Link to="/tendenciaDiaria"><Button variant="light" className="footer__navbar_button">Tendencia Hoy</Button></Link>
            <Link to="/tendenciaSemanal"><Button variant="light" className="footer__navbar_button">Tendencia Semanal</Button></Link>
            <Link to="/cartelera"><Button variant="light" className="footer__navbar_button">En Cartelera</Button></Link>
            <Link to="/estrenos"><Button variant="light" className="footer__navbar_button">Proximos Estrenos</Button></Link>
            <Link to="/topRankin"><Button variant="light" className="footer__navbar_button">Mejores Puntuadas</Button></Link>

        </ul>

    </div>
  )
}