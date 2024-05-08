import { Link } from "react-router-dom"




export const Footer = () => {

  return (

    // Este componente seria el Footer con la botonera de secciones

    <div className="Footer__Container">
        
        {/* Leyenda que indica que componente es, Esto se BORRA */}
        <span style={{fontSize: '.8rem', color: '#4c4c4c'}}>GRIS: Componente Footer</span>


        <ul className="Footer__Navbar">
            
            {/* Menues OPCIONALES, agregar o quitar los necesarios */}
            <Link to="/"><li className="Footer__Navbar_Button">Home</li></Link>
            <Link to="/popular"><li className="Footer__Navbar_Button">Populares</li></Link>
            <Link to="/now_playing"><li className="Footer__Navbar_Button">En Cartelera</li></Link>
            <Link to="/upcoming"><li className="Footer__Navbar_Button">Proximos Estrenos</li></Link>
            <Link to="/top_rated"><li className="Footer__Navbar_Button">Mejores Puntuadas</li></Link>
            <Link to="/registrate"><li className="Footer__Navbar_Button">Registrate</li></Link>

        </ul>

    </div>
  )
}