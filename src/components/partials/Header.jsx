import { Link } from "react-router-dom"
import { useState } from "react";

import { auth } from "../../utils/firebaseCredentials";         //  Importamos la instancia del servicio incializado con getAuth y guardado en  la constante auth
import { onAuthStateChanged, signOut } from "firebase/auth";    //  Importamos los modulos/funciones a utilizar de Firebase Authentication 
                                                                //    onAuthStateChanged: Saber el estado de si un usuario esta logueado o no
                                                                //    signOut: para cerrar la sesion
import Button from 'react-bootstrap/Button';

export const Header = () => {

  // Creamos un observador global para que verifique si hay un usuario Logeado o no
  const [logedUser, setLogedUser] = useState(null)
  // onAuthStateChanged: guarda en el segundo parametro un objeto con data del usuario cuando esta logeado (fbLogedUser). 
  // Entonces: en el ternario si el objeto existe lo guardamos en "LogedUser" con el useState y sino guardamos un null manteniendo su estado inicial (no logeado)
  onAuthStateChanged(auth, (fbLogedUser) => {fbLogedUser ?setLogedUser(fbLogedUser) :setLogedUser(null)})

  return (

    <div className="header__container">
        
        {/* Leyenda que indica que componente es, Esto se BORRA */}
        {/* <span style={{fontSize: '.8rem', color: '#4c4c4c'}}>GRIS: Componente Header</span> */}


        {/* especie de ventana modal o card que se muestra al logearse el usuario  (tambien podriamos incluirlo en el header, ver ideas) */}
        {logedUser
                ?   <div className="header__userLogedCard">
                        <span>Bienvenido: {logedUser.email}</span>
                        <br/>
                        <button onClick={() => signOut(auth)}>Cerrar Sesion</button>
                    </div> 
                :   <></>
        }


        <h1 className="header__title">Buscador de Peliculas . Com</h1>            {/* Aca ver si metemos una imagen al header, un nombre o lo que fuere */}

        <ul className="header__navbar">
            
            {/* Menues OPCIONALES, agregar o quitar los necesarios */}
            <Link to="/"><Button variant="secondary"><li className="header__navbar_button">Home</li></Button></Link>
            <Link to="/tendenciaDiaria"><Button variant="secondary"><li className="header__navbar_button">Tendencia Hoy</li></Button></Link>
            <Link to="/tendenciaSemanal"><Button variant="secondary"><li className="header__navbar_button">Tendencia Semanal</li></Button></Link>
            <Link to="/cartelera"><Button variant="secondary"><li className="header__navbar_button">En Cartelera</li></Button></Link>
            <Link to="/estrenos"><Button variant="secondary"><li className="header__navbar_button">Proximos Estrenos</li></Button></Link>
            <Link to="/topRankin"><Button variant="secondary"><li className="header__navbar_button">Mejores Puntuadas</li></Button></Link>
            {logedUser    ?<></>   :<Link to="/registrate"><Button variant="secondary"><li className="header__navbar_button">Registrate</li></Button></Link>}

        </ul>

    </div>
  )
}