import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { auth, db } from "../../utils/firebaseCredentials";            //  Importamos la instancia del servicio incializado con getAuth y guardado en  la constante auth
import { createUserWithEmailAndPassword } from "firebase/auth";    //  Importamos los modulos/funciones a utilizar de Firebase Authentication 
import { collection, addDoc, Timestamp } from "firebase/firestore";           //  Importamos los modulos/funciones a utilizar de Firebase Firestore 


export const Register = () => {

    // Guardamos Navigate en una constante para poder usarlo
    const navigate = useNavigate();

    // Referenciamos la Coleccion (tabla) donde se guardaran los datos del registro
    const usuariosCollecton = collection(db, "usuarios");



    // Funcion invocada al presionar el boton de Registrarme
    const onSubmitRegisterForm = async (event) => {
        event.preventDefault()  // prevenimos la recarga de la pagina al presionar el submit

        // Creamos un objeto que almacena el "momento actual" para despues de el obtener la hora con el metodo .getTime()
        const now = new Date();

        // Como Direstore almacena las fechas en formato UTC y nuestro HTML tiene la zona horaria local, se crea una distorsion de la fecha
        // Para ello debemos convertir nuestra fecha a formato UTC con las siguientes lineas
        const fechaInput = event.target.nacimiento.value;   // Obtener el valor del campo de fecha en formato yyyy-MM-dd
        const [year, month, day] = fechaInput.split('-');   // Separar el valor en año, mes y día
        const fechaLocal = new Date(year, month - 1, day);  // Crear un objeto Date con la fecha en la zona horaria local del usuario
        const timestampNacimiento = Timestamp.fromDate(new Date(fechaLocal.getTime() + fechaLocal.getTimezoneOffset() * 60000));    // Obtener el timestamp de la fecha local y convertirlo a formato UTC

        // Objeto con la data a cargar en la Coleccion (Tabla) Usuarios
        const userDataToSave = {
            nombre: event.target.nombre.value,
            apellido: event.target.apellido.value,
            correo: event.target.correo.value,
            nacimiento: timestampNacimiento,
            pais: event.target.pais.value,
            registrado: Timestamp.fromDate(new Date(now.getTime()))
        }
        
        // primero de todo comparamos que ambas contraseñas sean iguales
        if (event.target.contrasena.value === event.target.repitecontrasena.value) {        // si lo son hacemos esto

            try {

                console.log(userDataToSave);
                await createUserWithEmailAndPassword(auth, event.target.correo.value, event.target.contrasena.value)    //
                        .then(alert("Registrado correctamente.."))       // Esto cambiar por un sweet alert
                
                await addDoc(usuariosCollecton, userDataToSave)
                        .then(navigate(`/`))    // hacemos que la pagina "navegue" hacia el home ya que automaticamente quedara logeado

              } catch (error) {

                // Nota IMPORTANTE:   para poder recibir errores personalizados de acuerdo al tipo de error se debe Desabilitar la protección de enumeración de correo electrónico
                //                    https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection?hl=es-419
                //                    Firebase -> Proyecto -> Authentication -> Configuracion -> Acciones del Usuario -> Protección de enumeración de correo electrónico (Destildar y guardar)
                //                    Leer articulo sobre recomendaciones (Mantener Activada) para ataques en los cuales hacen muchas solicitudes a la api con emails posibles y si tienen respuesta (de registrado) intentan ingresar con contraseñas filtradas
                //console.log(error.code);
        
                if (error.code == "auth/weak-password"){    // todas estas alert tambien van sweet alert
                  alert("Contraseña Debil: por favor utilice minimamente 6 caracteres")
                }else if ("auth/email-already-in-use"){
                  alert("Usted ya se encuentra registrado")
                }else{
                  alert("Error al intentar Registrarse")
                }
              }

            

        }else {     // si las contraseñas no coinciden advertimos para correccion

            // Esto cambiar por un sweet alert
            alert("Las contraseñas no coinciden")

        }
    }


  return (

        <div className="register__container">
            <form className="register__form" onSubmit={(event) => onSubmitRegisterForm(event)}>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <br />
                    <input type="text" name="nombre" id="nombre" className="register__input" required></input>
                </div>
                <div>
                    <label htmlFor="apellido">Apellido:</label>
                    <br />
                    <input type="text" name="apellido" id="apellido" className="register__input" required></input>
                </div>
                <div>
                    <label htmlFor="correo">Correo:</label>
                    <br />
                    <input type="email" name="correo" id="correo" className="register__input" required></input>
                </div>
                <div>
                    <label htmlFor="nacimiento">Cumpleaños:</label>
                    <br />
                    <input type="date" name="nacimiento" id="nacimiento" className="register__input" required></input>
                </div>
                <div>
                    <label htmlFor="pais">Pais:</label>
                    <br />
                    <input type="text" name="pais" id="pais" className="register__input" required></input>
                </div>
                <div>
                    <label htmlFor="contrasena">Contraseña:</label>
                    <br />
                    <input type="password" name="contrasena" id="contrasena" className="register__input" required></input>
                </div>
                <div>
                    <label htmlFor="repitecontrasena">Repite Contraseña:</label>
                    <br />
                    <input type="password" name="repitecontrasena" id="repitecontrasena" className="register__input" required></input>
                </div>
                
                <div className="register__btn">
                    <button type="submit" className="register__submit">Registrarme</button>
                </div>
            </form>
        </div> 

  )
}