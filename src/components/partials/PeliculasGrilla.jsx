import { useState, useEffect } from "react"
import { getDataMovieDB } from "../../utils/conexionAPI"

import { PeliculasCard } from "./PeliculasCard"
import { Paginador } from "./paginador"
import { Link } from "react-router-dom"

import { useParams } from "react-router-dom"


export const PeliculasGrilla = ({endpointGRILLA}) => {


  const APIendpoint = endpointGRILLA
  const APIlanguage = "es-AR"

  
  const [apiData, setapiData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [movieDBisWorking, setmovieDBisWorking] = useState(true)
  const [movieDBisDown, setmovieDBisDown] = useState(false)
  const [pageNumber, setpageNumber] = useState(1)
  const [totalPages, settotalPages] = useState()


  // Capturamos de la URL si existe un criterio de busqueda, luego con un ternario en caso afirmativo lo almacenamos en searchValue y caso negativo le asignamos un null a searchValue
  const {criteriobusqueda} = useParams()
  let searchValue = ""
  criteriobusqueda  ?searchValue = criteriobusqueda
                    :searchValue = null


  useEffect( () => {    // Como primer argumento del useEffect pasamos la funcion que queremos ejecutar, en este caso nuestra consulta a la API, a esto lo llamaremos evento secundario
                        //    este evento secundario como minimo se ejecutara 1 vez al cargar el componente, luego, que se ejecute mas veces dependera del array pasado como 2° argumento
    
    setIsLoading(true)

    const fetchData = async () => {
      const { data, isLoadingApiData, isWorkingApi, movieDBdown } = await getDataMovieDB(APIendpoint, pageNumber, APIlanguage, searchValue)
      setapiData(data.results);
      settotalPages(data.total_pages);
      setIsLoading(isLoadingApiData)
      setmovieDBisWorking(isWorkingApi)
      setmovieDBisDown(movieDBdown)
    };

    fetchData();

  }, [APIendpoint, pageNumber])  // Porque pasamos "filtersmoviesBy" aqui? porque es una dependencia mas que estamos "vigilando" si cambia, entonces al cambiar dispara el evento secundario
                        //    si no pasaramos nada en este array, es decir, estaria vacio, no estariamos vigilando el cambio de nada. (solo dispararia el evento secundario al cargar incialmente)


  const onCambiarPagina = (paginaActual) => {
    setpageNumber(paginaActual)
  }    
  

  
  return (
    // Este componente arma la grilla de peliculas, que en base a cada pelicula dentro del JSON mostrara una card como si fuera un item
    <>
    

      <div className="peliculasGrilla__container">

          {/* Leyenda que indica que componente es, Esto se BORRA */}
          <span style={{fontSize: '.8rem', color: 'red'}}>ROJO: Componente Grilla de Peliculas</span>

          <h2>Grilla de Peliculas</h2>

          <div className="peliculasGrilla__ItemsContainer">

              {isLoading === true 
                      
                        ? (
                            <div className="peliculasGrilla__loading">
                                <h3>C a r g a n d o  . . .</h3>
                                <img className="peliculasGrilla__loading-img" src={`/images/loading.gif`} alt="Imagen Pelicula" />
                            </div>
                          )  
                        : movieDBisDown === true 
                        
                                          ? (
                                              <div className="peliculasGrilla__server-down">
                                                  <h3>El Servidor está caído... Intente más tarde..</h3>
                                                  <img className="peliculasGrilla__server-down-img" src={`/images/serverDown.jpg`} alt="TMDB No Response"/>
                                              </div>
                                            )
                                          : movieDBisWorking === false 
                                                                ? (
                                                                    <div className="peliculasGrilla__server-error">
                                                                        <h3>El Servidor no responde correctamente... Intente más tarde..</h3>
                                                                        <img className="peliculasGrilla__server-error-img" src={`./images/TMDBerror.jpg`} alt="TMDB No Response" />
                                                                    </div>
                                                                  ) 
                                                                : (
                                                                    apiData.map((itemData) => (
                                                                                              <Link to={`/detallepelicula/${itemData.id}`} key={itemData.id}>
                                                                                                  <PeliculasCard cardItemData={itemData}></PeliculasCard>
                                                                                              </Link>
                                                                                              ))
                                                                  )
              }

          </div>


          <Paginador cambiarPagina={onCambiarPagina} dataActualPage={pageNumber} dataTotalPages={totalPages} ></Paginador>

      </div>
    </>
  )
}