import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { ListPage } from './components/pages/ListPage';
import { DetailsPage } from './components/pages/DetailsPage';
import { RegisterPage } from './components/pages/RegisterPage';


function App() {

  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<HomePage />} />

        <Route path="/tendenciaDiaria" element={<ListPage endpointRUTA="trending/movie/day" />} />
        <Route path="/tendenciaSemanal" element={<ListPage endpointRUTA="trending/movie/week" />} />
        <Route path="/cartelera" element={<ListPage endpointRUTA="movie/now_playing" />} />
        <Route path="/estrenos" element={<ListPage endpointRUTA="movie/upcoming" />} />
        <Route path="/topRankin" element={<ListPage endpointRUTA="movie/top_rated" />} />

        <Route path="/buscar/:criteriobusqueda" element={<ListPage endpointRUTA="movie/top_rated" />} />

        <Route path="/detallepelicula/:idpelicula" element={<DetailsPage />} />

        <Route path="/registrate" element={<RegisterPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
