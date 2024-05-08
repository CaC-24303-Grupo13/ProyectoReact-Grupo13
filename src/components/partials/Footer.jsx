import { Link } from "react-router-dom"




export const Footer = () => {

  return (

    <div className="footer__container">
        
        {/* Leyenda que indica que componente es, Esto se BORRA */}
        <span style={{fontSize: '.8rem', color: '#4c4c4c'}}>GRIS: Componente Footer</span>

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