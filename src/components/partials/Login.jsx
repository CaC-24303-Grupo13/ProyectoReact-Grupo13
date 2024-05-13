import { Link } from "react-router-dom/dist";
import { useState } from "react";
import SweetAlertConfig from '../../../src/utils/swal2.config';
import { auth } from "../../utils/firebaseCredentials";       //  Importamos la instancia del servicio incializado con getAuth y guardado en  la constante auth
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";    //  Importamos los modulos/funciones a utilizar de Firebase Authentication 
                                                                //    onAuthStateChanged: Saber el estado de si un usuario esta logueado o no
                                                                //    signInWithEmailAndPassword: iniciar sesion con un email y contraseña

                                                        

export const Login = () => {

  // Creamos un observador global para que verifique si hay un usuario Logeado o no
  const [logedUser, setLogedUser] = useState(null)
  // onAuthStateChanged: guarda en el segundo parametro un objeto con data del usuario cuando esta logeado (fbLogedUser). 
  // Entonces: en el ternario si el objeto existe lo guardamos en "LogedUser" con el useState y sino guardamos un null manteniendo su estado inicial (no logeado)
  onAuthStateChanged(auth, (fbLogedUser) => {fbLogedUser ?setLogedUser(fbLogedUser) :setLogedUser(null)})


  // Funcion invocada al presionar el boton de Ingresar
  const onSubmitLogin = async (event) => {
    event.preventDefault()

        try {

            await signInWithEmailAndPassword(auth, event.target.user.value, event.target.password.value)

        } catch (error) {
        // Nota IMPORTANTE:   para poder recibir errores personalizados de acuerdo al tipo de error se debe Desabilitar la protección de enumeración de correo electrónico
        //                    https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection?hl=es-419
        //                    Firebase -> Proyecto -> Authentication -> Configuracion -> Acciones del Usuario -> Protección de enumeración de correo electrónico (Destildar y guardar)
        //                    Leer articulo sobre recomendaciones (Mantener Activada) para ataques en los cuales hacen muchas solicitudes a la api con emails posibles y si tienen respuesta (de registrado) intentan ingresar con contraseñas filtradas
        

                // todos estos alert reemplazarlos por Sweet Alerts o mensajes en el la pantalla sobre la misma pagina... elegir a gusto
                if (error.code == "auth/user-not-found"){
                    SweetAlertConfig.alertaError("error","No estas registrado, por favor registrese");
                }else if ("auth/wrong-password"){
                    SweetAlertConfig.alertaError("info","Datos incompletos");
                }else{
                    SweetAlertConfig.alertaError("error","Error en inicio de sesion");
                }
        }
  }


  
   return (


    <div className="login__container">
        <form className="login__form" onSubmit={(event) => onSubmitLogin(event)}>
            <div>
                <label htmlFor="user">Usuario:</label>
                <br/>
                <input type="email" name="user" id="user" className="login__form-inputfield"></input>
            </div>
            <div>
                <label htmlFor="password">Contraseña:</label>
                <br/>
                <input type="password" name="password" id="password" className="login__form-inputfield"></input>
            </div>

            <button type="submit">Ingresar</button>
            
            <div className="login__register-link">
                <span>¿No eres usuario? </span><Link to="/registrate">¡Haz click y Registrate!</Link>
            </div>
        </form>
    </div>


  )
}