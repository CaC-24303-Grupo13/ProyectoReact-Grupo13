import { Login } from "./Login"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

//  import "../../../public/css/partials/recomendados.css"    (Este no se importa aqui, va en el "index.css")

const API_BASE_URL = import.meta.env.VITE_MOVIEDB_API_BASE_URL;
const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;

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


// Traslado del Codigo de Herna

const [movies, setMovies] = useState([]);

const fetchMovies = async () => {
  try {
      const [dailyResponse, weeklyResponse, topRatedResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/trending/movie/day?api_key=${API_KEY}`),
        fetch(`${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}`),
        fetch(`${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
      ]);
  
      const [dailyData, weeklyData, topRatedData] = await Promise.all([
        dailyResponse.json(),
        weeklyResponse.json(),
        topRatedResponse.json()
      ]);

      // Función para seleccionar 2 elementos aleatorios de un array
      const getRandomElements = (arr, numElements) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numElements);
      };

    const dailyRandomMovies = getRandomElements(dailyData.results, 2);
    const weeklyRandomMovies = getRandomElements(weeklyData.results, 2);
    const topRatedRandomMovies = getRandomElements(topRatedData.results, 2);
  
      const combinedMovies = [
        ...dailyRandomMovies,
        ...weeklyRandomMovies,
        ...topRatedRandomMovies
      ];
  
      setMovies(combinedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

useEffect(() => {
  fetchMovies();
}, []);





 
  return (
    
    <main className= "app_container welcome__main">

        <h2 className="welcome_titulo">Bienvenido</h2>
        <p className="welcome_subtitulo">En esta App podra encontrar las mejores peliculas</p>


        { logedUser
                      // Si "logedUser" existe mostramos esto  (diseñar alguna pantalla de bienvenida)
                    ? <>
                        <div className="recomendadas__container">
                          <h2 className="recomendadas_titulo">Hola {logedUser.email}, te estabamos esperando...</h2>  
                          <p className="recomendadas_subtitulo">Aca te dejamos un contenido seleccionado especialmente para vos</p>

                          <div className="recomendados__MoviesContainer">
                            {movies.map((movie) => (
                              <Link to={`/detallepelicula/${movie.id}`} key={movie.id}>
                              <div key={movie.id} className="card">
                                <img
                                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                  alt={movie.title}
                                  className="card-img-top"
                                />
                              </div>
                              </Link>
                            ))}
                          </div>

                        </div>
                      </>

                      // Si "logedUser" no existe (esta como null) mostramos esto

                    :   <Login></Login>                  

        }

    </main>

  )
}