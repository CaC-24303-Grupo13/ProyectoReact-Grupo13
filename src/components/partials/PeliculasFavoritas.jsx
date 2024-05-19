import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

// Too esto de Firestore se paso al "helper" llamado "getFavorites.js"
import { db, auth } from "../../utils/firebaseCredentials";            //  Importamos la instancia del servicio incializado con getFirestore y guardado en  la constante db
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";    //  Importamos los modulos/funciones a utilizar de Firebase Authentication 

//import { getDataMovieDB } from '../../utils/conexionAPI';     // Ya no lo requerimos porque ahora importamos la funcion que directamente nos entrega el array de favoritas
import { getPeliculasFavoritas, checkFavoriteStatus } from '../../utils/getFavorites';   // aqui importamos la funcion que nos entrega el array de favoritas


import { PeliculasCard } from "./PeliculasCard"




export const PeliculasFavoritas = () => {



// Inicializacion de estados
const [peliculasFavoritas, setPeliculasFavoritas] = useState([])      // inicializamos la variable peliculasFavoritas como un array vacio que luego sera "completado" con el useEffect al instanciar traerPeliculas que instanciara getPeliculasFavoritas
const [isLoading, setIsLoading] = useState(true)
// estos dos siguientes ver si los usamos o no (actualmente no se estan usando)
const [movieDBisWorking, setmovieDBisWorking] = useState(true)  // Estos valores si queremos usarlos habria que hacer que el "getFavorites.js" nos lo pase hacia aqui
const [movieDBisDown, setmovieDBisDown] = useState(false)       // Estos valores si queremos usarlos habria que hacer que el "getFavorites.js" nos lo pase hacia aqui


// Como se nos ejecutaba antes la consulta a la API que necesitaba el "fbLogedUser.email" y aun no estaba definido nos quedaba en un permanente cargando
// por ello pasamos el objeto que recibimos de la funcion "onAuthStateChanged" como argumento a una callback anonima y asincrona donde verificaremos
// si dicho objeto existe, y en caso afirmativo se realizara la consulta a la API para obtener las pelis, caso contrario deberemos manejar el error.
const listarPeliculas = async () => {

    onAuthStateChanged(auth, async (fbLogedUser) => {
        //onAuthStateChanged: función de Firebase que escucha los cambios en el estado de autenticación. Cuando se detecta un cambio (LogIn o LogOut), ejecuta la función de devolución de llamada que le pasas como segundo argumento (Callback).

        if (fbLogedUser) {

            try {

                const { dataPelis, isLoadingApiData } = await getPeliculasFavoritas(fbLogedUser.email);

                const peliculasYfavoriteStatus = await Promise.all(
                    dataPelis.map(async (pelicula) => {
                        const favoriteStatus = await checkFavoriteStatus(fbLogedUser.email, pelicula.id);
                        return { ...pelicula, isFavorite: favoriteStatus };
                    })
                );

                setPeliculasFavoritas(peliculasYfavoriteStatus);
                setIsLoading(isLoadingApiData);
                setmovieDBisWorking(true)       // Estos valores si queremos usarlos habria que hacer que el "getFavorites.js" nos lo pase hacia aqui
                setmovieDBisDown(false)         // Estos valores si queremos usarlos habria que hacer que el "getFavorites.js" nos lo pase hacia aqui

            } catch (error) {

                console.error('Error al obtener las películas favoritas:', error);
                setIsLoading(false);

            }

        } else {
            
            console.error('Error al obtener las películas favoritas');
            setIsLoading(false);

        }
    });
};


useEffect(() => {
    listarPeliculas();
}, []);


  return (
 
        <main className="app_container">
            
            <h2 className="peliculasFavoritas__title">Peliculas Favoritas</h2>

            <div className="peliculasFavoritas__ItemsContainer">


                {isLoading === true     // evaluamos si "isLoadin" es true, en caso correcto mostrasmos el "?" y sino entramos al ":"
                        
                        ? (
                            <div className="peliculasFavoritas__loading">
                                <h3>C a r g a n d o  . . .</h3>
                                <img className="peliculasFavoritas__loading-img" src={`/images/loading.gif`} alt="Imagen Pelicula" />
                            </div>
                            )  
                        : movieDBisDown === true         // evaluamos si "movieDBisDown" es true, en caso correcto mostrasmos el "?" y sino entramos al ":"
                        
                                            ? (
                                                <div className="peliculasFavoritas__server-down">
                                                    <h3>El Servidor está caído... Intente más tarde..</h3>
                                                    <img className="peliculasFavoritas__server-down-img" src={`/images/serverDown.jpg`} alt="TMDB No Response"/>
                                                </div>
                                            )
                                            : movieDBisWorking === false         // Este punto debe ser revisado ya que para mi esta funcionando a la inversa, ver nota linea 42
                                                                ? (
                                                                    <div className="peliculasFavoritas__server-error">
                                                                        <h3>El Servidor no responde correctamente... Intente más tarde..</h3>
                                                                        <img className="peliculasFavoritas__server-error-img" src={`/images/TMDBerror.jpg`} alt="TMDB No Response" />
                                                                    </div>
                                                                    ) 
                                                                    : (
                                                                        peliculasFavoritas.map((pelicula) =>  (
                                                                                            // <div className="peliculasFavoritas__CardContainer" key={pelicula.id}>
                                                                                                    // <Link to={`/detallepelicula/${pelicula.id}`} >
                                                                                                        <PeliculasCard cardItemData={pelicula} cardItemDataFavoriteStatus={pelicula.isFavorite} key={pelicula.id}></PeliculasCard>
                                                                                                    // </Link>
                                                                                            // </div>
                                                                                                            )) // Cierre .map
                                                                    )
                }

            </div>

        </main>

  )
}