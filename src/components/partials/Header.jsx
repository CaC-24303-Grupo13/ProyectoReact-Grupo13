import { Link } from "react-router-dom"
import { useState } from "react";

import { auth } from "../../utils/firebaseCredentials";         //  Importamos la instancia del servicio incializado con getAuth y guardado en  la constante auth
import { onAuthStateChanged, signOut } from "firebase/auth";    //  Importamos los modulos/funciones a utilizar de Firebase Authentication 
                                                                //    onAuthStateChanged: Saber el estado de si un usuario esta logueado o no
                                                                //    signOut: para cerrar la sesion


export const Header = () => {

  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  const toggleDropdownMenu = () => {
      setShowDropdownMenu(!showDropdownMenu);
  };
  // Creamos un observador global para que verifique si hay un usuario Logeado o no
  const [logedUser, setLogedUser] = useState(null)
  // onAuthStateChanged: guarda en el segundo parametro un objeto con data del usuario cuando esta logeado (fbLogedUser). 
  // Entonces: en el ternario si el objeto existe lo guardamos en "LogedUser" con el useState y sino guardamos un null manteniendo su estado inicial (no logeado)
  onAuthStateChanged(auth, (fbLogedUser) => {fbLogedUser ?setLogedUser(fbLogedUser) :setLogedUser(null)})

  return (

    <div className="header__container">
        
  

        {/* especie de ventana modal o card que se muestra al logearse el usuario  (tambien podriamos incluirlo en el header, ver ideas) */}
        {logedUser
                ?   <div className="header__userLogedCard">
                        <span>Bienvenido: {logedUser.email}</span>
                        
                        <button onClick={() => signOut(auth)}>Salir</button>
                    </div> 
                :   <></>
        }


        <h1 className="header__title">Buscador de Peliculas . Com</h1>            {/* Aca ver si metemos una imagen al header, un nombre o lo que fuere */}




        <ul className="header__navbar">
            
            {/* Menues OPCIONALES, agregar o quitar los necesarios */}
            <Link to="/"><li className="header__navbar_button">Home</li></Link>
            <Link to="/tendenciaDiaria"><li className="header__navbar_button">Tendencia Hoy</li></Link>
            <Link to="/tendenciaSemanal"><li className="header__navbar_button">Tendencia Semanal</li></Link>
            <Link to="/cartelera"><li className="header__navbar_button">En Cartelera</li></Link>
            <Link to="/estrenos"><li className="header__navbar_button">Proximos Estrenos</li></Link>
            <Link to="/topRankin"><li className="header__navbar_button">Mejores Puntuadas</li></Link>
            {logedUser    ?<></>   :<Link to="/registrate"><li className="header__navbar_button">Registrate</li></Link>}

        </ul>

    </div>
  )
}