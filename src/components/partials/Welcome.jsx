import { Login } from "./Login"
import { useState } from "react";

import { auth } from "../../utils/firebaseCredentials";       //  Importamos la instancia del servicio incializado con getAuth y guardado en  la constante auth
import { onAuthStateChanged } from "firebase/auth";           //  Importamos los modulos/funciones a utilizar de Firebase Authentication 
                                                              //    onAuthStateChanged: Saber el estado de si un usuario esta logueado o no

export const Welcome = () => {

  // Creamos un observador global para que verifique si hay un usuario Logeado o no
  const [logedUser, setLogedUser] = useState(null)
  // onAuthStateChanged: guarda en el segundo parametro un objeto con data del usuario cuando esta logeado (fbLogedUser). 
  // Entonces: en el ternario si el objeto existe lo guardamos en "LogedUser" con el useState y sino guardamos un null manteniendo su estado inicial (no logeado)
  onAuthStateChanged(auth, (fbLogedUser) => {fbLogedUser ?setLogedUser(fbLogedUser) :setLogedUser(null)})
 
  return (
    

    <div style={{border: 'solid 2px red', padding: '0 1rem 1rem 1rem'}}>

        {/* Leyenda que indica que componente es, Esto se BORRA */}
        <span style={{fontSize: '.8rem', color: 'red'}}>ROJO: Componente mensaje de Bienvenida Home</span>

        <h2>Bienvenido</h2>
        <p>En esta App podra encontrar las mejores peliculas</p>


        { logedUser
                      // Si "logedUser" existe mostramos esto  (diseñar alguna pantalla de bienvenida)
                    ? <>
                        <div className="welcome__container">
                          <h2>Hola {logedUser.email}, bienvenido de nuevo...</h2>  
                          <p>Aca te dejamos un contenido seleccionado especialmente para vos</p>
                          <p>etcetera</p>
                          <p>etcetera</p>
                          <p>etcetera</p>
                        </div>
                      </>

                      // Si "logedUser" no existe (esta como null) mostramos esto

                    :   <Login></Login>                  

        }



    </div>
  )
}