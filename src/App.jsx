import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from "react";

import { HomePage } from './components/pages/HomePage';
import { ListPage } from './components/pages/ListPage';
import { DetailsPage } from './components/pages/DetailsPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { PeliculasFavoritas } from './components/partials/PeliculasFavoritas';

import { auth } from "./utils/firebaseCredentials";       //  Importamos la instancia del servicio incializado de Auth.
import { onAuthStateChanged } from "firebase/auth";    //  Importamos los modulos/funciones a utilizar de Firebase Authentication 
                                                                //    onAuthStateChanged: Saber el estado de si un usuario esta logueado o no


function App() {

  // Creamos un observador global para que verifique si hay un usuario Logeado o no
  const [logedUser, setLogedUser] = useState(null)
  // onAuthStateChanged: guarda en el segundo parametro un objeto con data del usuario cuando esta logeado (firebaseResponse). 
  // Entonces: en el ternario si el objeto existe lo guardamos en "LogedUser" con el useState y sino guardamos un null o mantenemos su estado inicial
  onAuthStateChanged(auth, (fbLogedUser) => {fbLogedUser ?setLogedUser(fbLogedUser) :setLogedUser(null)})

    // funcion que nos redirecciona a home "/"
    const redirectToHome = () => {
      return <Navigate to="/" replace />;
    };

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        {/* En todos estos casos, si "logedUser" existe, mostramos el componente, sino, redireccionamos a home */}
        <Route path="/tendenciaDiaria" element={logedUser   ?<ListPage endpointRUTA="trending/movie/day" />   :redirectToHome()} />
        <Route path="/tendenciaSemanal" element={logedUser  ?<ListPage endpointRUTA="trending/movie/week" />  :redirectToHome()} />
        <Route path="/cartelera" element={logedUser   ?<ListPage endpointRUTA="movie/now_playing" />  :redirectToHome()} />
        <Route path="/estrenos" element={logedUser  ?<ListPage endpointRUTA="movie/upcoming" />   :redirectToHome()} />
        <Route path="/topRankin" element={logedUser   ?<ListPage endpointRUTA="movie/top_rated" />  :redirectToHome()} />

        <Route path="/buscar/:criteriobusqueda" element={logedUser  ?<ListPage endpointRUTA="movie/top_rated" />  :redirectToHome()} />

        <Route path="/detallepelicula/:idpelicula" element={logedUser   ?<DetailsPage />  :redirectToHome()} />

        {/* Este caso es a la inversa, si "logedUser" existe, redireccionamos a home (porque no se puede registrar nuevamente) y si no existe mostramos registrar */}
        <Route path="/registrate" element={logedUser   ?redirectToHome()  :<RegisterPage />} />

        {/* Ruta de prueba para traer las favoritas */}
        <Route path="/pruebaFavoritas" element={<PeliculasFavoritas />}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
