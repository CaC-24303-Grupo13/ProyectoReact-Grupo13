import { Login } from "./Login"
import { useState } from "react";

import { auth } from "../../utils/firebaseCredentials";       //  Importamos la instancia del servicio incializado con getAuth y guardado en  la constante auth
import { onAuthStateChanged } from "firebase/auth";           //  Importamos los modulos/funciones a utilizar de Firebase Authentication 
                                                              //    onAuthStateChanged: Saber el estado de si un usuario esta logueado o no
import Recomendados from '../partials/Recomendados';
export const Welcome = () => {

  // Creamos un observador global para que verifique si hay un usuario Logeado o no
  const [logedUser, setLogedUser] = useState(null)
  // onAuthStateChanged: guarda en el segundo parametro un objeto con data del usuario cuando esta logeado (fbLogedUser). 
  // Entonces: en el ternario si el objeto existe lo guardamos en "LogedUser" con el useState y sino guardamos un null manteniendo su estado inicial (no logeado)
  onAuthStateChanged(auth, (fbLogedUser) => {fbLogedUser ?setLogedUser(fbLogedUser) :setLogedUser(null)})
 
  return (
    

    <div  className= "pageLogin__container" >


        <h2 className="pageLogin_titulo">Bienvenido</h2>
        <p className="pageLogin_p">En esta App podra encontrar las mejores peliculas</p>


        { logedUser
                      // Si "logedUser" existe mostramos esto  (diseñar alguna pantalla de bienvenida)
                    ? <>
                        <div className="welcome__container">
                          <h2 className="welcome__container_titulo">Hola {logedUser.email}, bienvenido de nuevo...</h2>  
                          <p className="welcome__container_subtitulo">Aca te dejamos un contenido seleccionado especialmente para vos</p>
                          <Recomendados /> 
                          
                        </div>
                      </>

                      // Si "logedUser" no existe (esta como null) mostramos esto

                    :   <Login></Login>                  

        }



    </div>
  )
}