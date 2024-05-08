import { useState, useEffect } from "react"
import { getDataMovieDB } from "../../utils/conexionAPI"

import { PeliculasCard } from "./PeliculasCard"
import { Paginador } from "./Paginador"
import { Link } from "react-router-dom"

import { useParams } from "react-router-dom"


export const PeliculasGrilla = ({endpointGRILLA}) => {

  const APIendpoint = endpointGRILLA  // enpoint de consulta recibido desde el componente padre "ListPage" que a su vez lo recibio de su componente padre "App"   (Esto no me convence, debe haber forma mejor de hacerlo)
  const APIlanguage = "es-AR"         // seleccion del lenguaje de la informacion a recibir (es-AR) español   (en-US) ingles   (Se podria implementar un Switch para cambiar idioma)

  
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
    
    setIsLoading(true)    // establecemos que "isLoading" es true para que muestre el spinner mientras sucede el evento secundario

    const fetchData = async () => {       // definimos la arrow function que es la consulta a la API
      const { data, isLoadingApiData, isWorkingApi, movieDBdown } = await getDataMovieDB(APIendpoint, pageNumber, APIlanguage, searchValue)
      setapiData(data.results);             // actualizamos (guardamos) los resultados de peliculas
      settotalPages(data.total_pages);      // actualizamos (guardamos) el total de paginas
      setmovieDBisWorking(isWorkingApi)     // a revisar porque esta funcionando a la inversa, ver nota en "conexionAPI.js" linea 60
      setmovieDBisDown(movieDBdown)         // actualizamos (guardamos) si MovieDB esta caida o funcionando
      setIsLoading(isLoadingApiData)        // establecemos que "isLoading" es false (termino) para que ahora muestre la data
    };

    fetchData();    // hacemos que la arrow function definida se ejecute

  }, [APIendpoint, pageNumber])  // variables que estamos observando (dependencia) para ver si cambian y asi ejecutar nuevamente el evento secundario
  //    si pasaramos un array vacio, no estariamos vigilando el cambio de nada. (solo dispararia el evento secundario 1 vez al cargar el componente inicialmente)


  // Creamos una fx que establezca la pagina actual en el valor que recibe como parametro, y pasamos la funcion mediante la prop al componente hijo (paginador)
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

              {isLoading === true     // evaluamos si "isLoadin" es true, en caso correcto mostrasmos el "?" y sino entramos al ":"
                      
                        ? (
                            <div className="peliculasGrilla__loading">
                                <h3>C a r g a n d o  . . .</h3>
                                <img className="peliculasGrilla__loading-img" src={`/images/loading.gif`} alt="Imagen Pelicula" />
                            </div>
                          )  
                        : movieDBisDown === true         // evaluamos si "movieDBisDown" es true, en caso correcto mostrasmos el "?" y sino entramos al ":"
                        
                                          ? (
                                              <div className="peliculasGrilla__server-down">
                                                  <h3>El Servidor está caído... Intente más tarde..</h3>
                                                  <img className="peliculasGrilla__server-down-img" src={`/images/serverDown.jpg`} alt="TMDB No Response"/>
                                              </div>
                                            )
                                          : movieDBisWorking === false         // Este punto debe ser revisado ya que para mi esta funcionando a la inversa, ver nota linea 42
                                                                ? (
                                                                    <div className="peliculasGrilla__server-error">
                                                                        <h3>El Servidor no responde correctamente... Intente más tarde..</h3>
                                                                        <img className="peliculasGrilla__server-error-img" src={`/images/TMDBerror.jpg`} alt="TMDB No Response" />
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

          {/* incorporamos el componente paginador y como prop pasamos una funcion que sera ejecutada desde paginador (componente hijo) y nos "subira" un valor en el parametro */}
          <Paginador cambiarPagina={onCambiarPagina} dataActualPage={pageNumber} dataTotalPages={totalPages} ></Paginador>

      </div>
    </>
  )
}