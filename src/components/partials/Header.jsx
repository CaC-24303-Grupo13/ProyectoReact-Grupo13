import { Link } from "react-router-dom"




export const Header = () => {

  return (

    // Este componente seria el Header con la barra de navegacion

    <div className="Header__Container">
        
        {/* Leyenda que indica que componente es, Esto se BORRA */}
        <span style={{fontSize: '.8rem', color: '#4c4c4c'}}>GRIS: Componente Header</span>

            {/* SPAN que aparecera condicionalmente cuando el usuario este LOGEADO, sino no se ve */}
            <div className="Header__UserLogedCard">
                <span>Bienvenido: usuario@correo.com</span>
                <br/>
                <button>Cerrar Sesion</button>
            </div> 

        <h1 className="Header__Tittle">Buscador de Peliculas . Com</h1>

        <ul className="Header__Navbar">
            
            {/* Menues OPCIONALES, agregar o quitar los necesarios */}
            <Link to="/"><li className="Header__Navbar_Button">Home</li></Link>
            <Link to="/tendenciaDiaria"><li className="Header__Navbar_Button">Tendencia Hoy</li></Link>
            <Link to="/tendenciaSemanal"><li className="Header__Navbar_Button">Tendencia Semanal</li></Link>
            <Link to="/cartelera"><li className="Header__Navbar_Button">En Cartelera</li></Link>
            <Link to="/estrenos"><li className="Header__Navbar_Button">Proximos Estrenos</li></Link>
            <Link to="/topRankin"><li className="Header__Navbar_Button">Mejores Puntuadas</li></Link>
            <Link to="/registrate"><li className="Header__Navbar_Button">Registrate</li></Link>

        </ul>

    </div>
  )
}