
import { db } from "./firebaseCredentials";            //  Importamos la instancia del servicio incializado con getFirestore y guardado en  la constante db
import { collection, query, where, getDocs, addDoc, Timestamp, deleteDoc, doc } from 'firebase/firestore';             //  Importamos los modulos/funciones a utilizar de Firebase Firestore

import { getDataMovieDB } from "./conexionAPI";     // Importamos la consulta a la API

// Sweet Alert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)



// Desarrollo de las funcione que luego seran importadas en los componentees que se requiera.

export const getPeliculasFavoritas = async (idUsuario) => {
    
    // referenciamos la Coleccion (tabla) donde estan guardados los datos de peliculas favoritas
    const favoritasCollection = collection(db, 'favoritasUsuarios');

    // creamos una consulta para obtener documentos donde el campo "identificadorUsuario" sea igual a un determinado valor
    const queryString = query(favoritasCollection, where('identificadorUsuario', '==', idUsuario));

    try {

        // obtenemos los documentos que cumplen con el criterio de consulta
        const querySnapshot = await getDocs(queryString);

        //console.log(querySnapshot);

        // convertimos la respuesta recibida con los documentos en un array de objetos
        const documentos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));  // en cada iteracion tomamos el ID y la data con un spread operator armando 1 objeto
        // NOTA: no me convence el nombre de la variable documentos


        //console.log(documentos);


        //  Aqui almacenamos en "dataPelis" un array que contendra un objeto con la data proveniente de la api por cada pelicula que el usuario agrego a favoritas
        //  inicialmente indicamos con AWAIT que esperaremos la resolucion de esta operacion antes de continuar

        //  tambien agregamos el "Promise.all" que nos permitira ejecutar todas las consultas que el MAP va a iterar una detras de la otra casi en forma simultanea (sin esperar que se resuelvan), 
        //  PERO! solo sera resuelta positivamente si todas las promesas dentro del MAP se resuelven positivamente, si alguna de esas promesas falla el Promise.All tambien rechazara su promesa

        //  Entonces, el MAP de "documentos" ejecutara por cada elemento contenido en el array "documentos" una funcion flecha anonima asicrona que recibe como parametro los datos de 1 documento
        const dataPelis = await Promise.all(documentos.map( async (pelicula) => {

                            // Contenido de la funcion flecha
                            try {

                                const APIendpoint = `movie/${pelicula.idPeliculaFavorita}`;     // armamos el Endpoint con el ID de la Peli a traer para hacer la consulta a la API
                                const APIlanguage = "es-AR"     // Ver para sacar esto de aca o poner por defecto
                                const pageNumber = 1            // Ver para sacar esto de aca o poner por defecto
                                const searchValue = null        // Ver para sacar esto de aca o poner por defecto
                                const { data } = await getDataMovieDB(APIendpoint, 1, APIlanguage, searchValue);            // consultamos a la API
                                return data;    // Retornamos la informacion que sera un objeto tal cual recibimos de la API con la data de la Peli
                                
                            } catch (error) {

                                // Aqui tambien podriamos manejar los errores como hacemos en la consulta de la API
                                console.error(`Error al obtener datos de la película ID ${pelicula.idPeliculaFavorita}`, error);
                                return null;

                            }

                                                                                }   // Cierra la funcion flecha anonima
                                                            )   // Cierra el map
                                            );  // Cierra el Promise.all

                                                            
        //console.log(dataPelis);
        return {
            dataPelis,
            isLoadingApiData: false,
        };


    } catch (error) {

        console.error('Error al obtener Peliculas Favoritas', error);

    }

};






export const addToFavorites = async (userID, movieID) => {

    // Referenciamos la Coleccion (tabla) donde se guardaran los docuumentos (registros) que indican Peliculas Favoritas de los Usuarios.
    const favoritasCollection = collection(db, "favoritasUsuarios");

    // Creamos un objeto que almacena el "momento actual" para despues de el obtener la hora con el metodo .getTime()
    const now = new Date();

    // Objeto con la data a cargar en la Coleccion (Tabla) favoritasUsuarios
    const favoriteDataToSave = {
        idPeliculaFavorita: movieID,
        identificadorUsuario: userID,
        agregada: Timestamp.fromDate(new Date(now.getTime()))
    }

    try {

        await addDoc(favoritasCollection, favoriteDataToSave)
        //alert("Pelicula Agregada")
        MySwal.fire({
            position: "center",
            icon: "success",
            title: "Su pelicula fue agregada a Favoritos",
            showConfirmButton: false,
            timer: 1500
        })
        

    } catch (error) {

        console.error('Error al obtener las películas favoritas', error);
        //alert("Adicion Fallida")
        MySwal.fire({
            position: "center",
            icon: "success",
            title: "No pudimos Agregar su Pelicula",
            showConfirmButton: false,
            timer: 1500
        })

    }

};






export const removeFromFavorites = async (userID, movieID) => {

    // Referenciamos la Coleccion (tabla) donde se guardaran los docuumentos (registros) que indican Peliculas Favoritas de los Usuarios.
    const favoritasCollection = collection(db, "favoritasUsuarios");

    // creamos una consulta para obtener documentos donde el campo "identificadorUsuario" sea igual a un determinado valor
    const queryString = query(favoritasCollection, 
                                                    where('identificadorUsuario', '==', userID), 
                                                    where('idPeliculaFavorita', '==', movieID)
                                                );

    // obtenemos los documentos que cumplen con el criterio de consulta
    const querySnapshot = await getDocs(queryString);          
    
    // recorremos los documentos que obtuvimos (Solo 1 deberia cumplir el criterio de la consulta)
    querySnapshot.forEach((document) => {


        try {

            deleteDoc(doc(favoritasCollection, document.id))
            //alert("Pelicula Agregada")
            MySwal.fire({
                position: "center",
                icon: "success",
                title: "Quitaste la Pelicula de Favoritos",
                showConfirmButton: false,
                timer: 1500
            })
            
    
        } catch (error) {
    
            console.error('Error al obtener las películas favoritas', error);
            //alert("Adicion Fallida")
            MySwal.fire({
                position: "center",
                icon: "success",
                title: "No pudimos quitar su Pelicula",
                showConfirmButton: false,
                timer: 1500
            })
    
        }

    });

};





export const checkFavoriteStatus = async (userID, movieID) => {

    // Referenciamos la Coleccion (tabla) donde se guardaran los docuumentos (registros) que indican Peliculas Favoritas de los Usuarios.
    const favoritasCollection = collection(db, "favoritasUsuarios");

    // creamos una consulta para obtener documentos donde el campo "identificadorUsuario" sea igual a un determinado valor
    const queryString = query(favoritasCollection, 
                                                    where('identificadorUsuario', '==', userID), 
                                                    where('idPeliculaFavorita', '==', movieID)
                                                );

    // obtenemos los documentos que cumplen con el criterio de consulta
    const querySnapshot = await getDocs(queryString);          
    
    // retornamos true si existen documentos que cumplan el criterio, false si no existen
    return !querySnapshot.empty; 

};