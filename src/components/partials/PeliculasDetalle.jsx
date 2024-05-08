import { useState, useEffect } from 'react';
import { getDataMovieDB } from '../../utils/conexionAPI';
import { useParams } from "react-router-dom";




export default function PeliculasDetalle() {
  
  const { idpelicula } = useParams();  // el nombre de la variable debe coincidir con el nombre que le asignamos en la definicion de rutas con React Router DOM

  const APIendpoint = `movie/${idpelicula}`
  const APIlanguage = "es-AR"
  const pageNumber = 1
  const searchValue = null

  const [movieData, setmovieData] = useState([])
  const [isLoading, setisLoading] = useState(true)

  
  useEffect(() => {
    
    const fetchData = async () => {
      const { data, isLoadingApiData } = await getDataMovieDB(APIendpoint, 1, APIlanguage, searchValue)
      setmovieData(data)
      setisLoading(isLoadingApiData)
    }

    fetchData()

  }, [])

  return (

    // Componente individual que en base a determinado numero de ID deberia mostrar la informacion de 1 sola pelicula o serie o lo que fuere

    <div className="peliculasDetalle__container">

        {/* Leyenda que indica que componente es, Esto se BORRA */}
        <span style={{fontSize: '.8rem', color: 'blue'}}>AZUL: Componente Detalles de Pelicula</span>
       
        { isLoading == true

            ?   <div className="peliculasDetalle__loading">
                    <h3>C a r g a n d o  . . .</h3>
                    <img className="peliculasDetalle__loading-img" src={`../images/loading.gif`} alt="Cargando"/>
                </div>

            :   <div className="peliculasDetalle__flex">

                    {/* Aca hacer que el condicional no solo muestre una imagen vacia sino que tambien cuando viene data mala, mostrar que la pelicula no existe o redirigir al home */}

                    { movieData.poster_path != null
                        ?  <img className="peliculasDetalle__poster-img" src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} alt="Imagen Pelicula"/>
                        :  <img className="peliculasDetalle__poster-img" src={`../images/emptyPoster.svg`} alt="Imagen Pelicula" />
                    }
                    
                    <div>
                            {/* Aca ver que data mostrar, seguramente faltan cosas o sobran cosas */}

                            <h3>{movieData.title}</h3>
                            <p>{movieData.tagline}</p>
                            <p>Lanzamiento: {movieData.release_date}</p>
                            <p>{movieData.overview}</p>
                            <p>Url ID: {idpelicula}</p>         {/*   Este ID se obtiene desde la URL     */}
                            <p>Data ID: {movieData.id}</p>      {/*   Este ID se obtiene desde la Data de la API     */}
                    </div>
                
                </div>
        }
    
    </div>
  )
}