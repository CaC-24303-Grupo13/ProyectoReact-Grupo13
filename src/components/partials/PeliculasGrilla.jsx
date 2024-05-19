import { useState, useEffect } from "react"
import { getDataMovieDB } from "../../utils/conexionAPI"

import { PeliculasCard } from "./PeliculasCard"
import { Paginador } from "./Paginador"
import { Link } from "react-router-dom"

import { useParams } from "react-router-dom"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { checkFavoriteStatus } from '../../utils/getFavorites';   // aqui importamos la funcion que nos entrega el array de favoritas
import { auth } from "../../utils/firebaseCredentials";            //  Importamos la instancia del servicio incializado con getFirestore y guardado en  la constante db
import { onAuthStateChanged } from "firebase/auth";    //  Importamos los modulos/funciones a utilizar de Firebase Authentication 

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


  // Como se nos ejecutaba antes la consulta a la API que necesitaba el "fbLogedUser.email" y aun no estaba definido nos quedaba en un permanente cargando
// por ello pasamos el objeto que recibimos de la funcion "onAuthStateChanged" como argumento a una callback anonima y asincrona donde verificaremos
// si dicho objeto existe, y en caso afirmativo se realizara la consulta a la API para obtener las pelis, caso contrario deberemos manejar el error.
const listarPeliculas = async () => {

  onAuthStateChanged(auth, async (fbLogedUser) => {
      //onAuthStateChanged: función de Firebase que escucha los cambios en el estado de autenticación. Cuando se detecta un cambio (LogIn o LogOut), ejecuta la función de devolución de llamada que le pasas como segundo argumento (Callback).

      if (fbLogedUser) {

          try {

              //const { dataPelis, isLoadingApiData } = await getPeliculasFavoritas(fbLogedUser.email);
              const { data, isLoadingApiData, isWorkingApi, movieDBdown } = await getDataMovieDB(APIendpoint, pageNumber, APIlanguage, searchValue)
              
              const dataYfavoriteStatus = await Promise.all(
                data.results.map(async (pelicula) => {
                  const favoriteStatus = await checkFavoriteStatus(fbLogedUser.email, pelicula.id);
                      return { ...pelicula, isFavorite: favoriteStatus };
                  })
              );

              setapiData(dataYfavoriteStatus);      // actualizamos (guardamos) los resultados de peliculas
              settotalPages(data.total_pages);      // actualizamos (guardamos) el total de paginas
              setmovieDBisWorking(isWorkingApi)     // a revisar porque esta funcionando a la inversa, ver nota en "conexionAPI.js" linea 60
              setmovieDBisDown(movieDBdown)         // actualizamos (guardamos) si MovieDB esta caida o funcionando
              setIsLoading(isLoadingApiData)        // establecemos que "isLoading" es false (termino) para que ahora muestre la data

          } catch (error) {

              console.error('Error al obtener las películas:', error);
              setIsLoading(false);

          }

      } else {
          
          console.error('Error al obtener las películas');
          setIsLoading(false);

      }
  });
};





  useEffect( () => {    // Como primer argumento del useEffect pasamos la funcion que queremos ejecutar, en este caso nuestra consulta a la API, a esto lo llamaremos evento secundario
                        //    este evento secundario como minimo se ejecutara 1 vez al cargar el componente, luego, que se ejecute mas veces dependera del array pasado como 2° argumento

    listarPeliculas();

  }, [APIendpoint, pageNumber])  // variables que estamos observando (dependencia) para ver si cambian y asi ejecutar nuevamente el evento secundario
  //    si pasaramos un array vacio, no estariamos vigilando el cambio de nada. (solo dispararia el evento secundario 1 vez al cargar el componente inicialmente)


  // Creamos una fx que establezca la pagina actual en el valor que recibe como parametro, y pasamos la funcion mediante la prop al componente hijo (paginador)
  const onCambiarPagina = (paginaActual) => {
    setpageNumber(paginaActual)
    setIsLoading(true)
  }    
  

  
  return (
    // Este componente arma la grilla de peliculas, que en base a cada pelicula dentro del JSON mostrara una card como si fuera un item
    <>

      <Container fluid>
        <Row>
          <Col></Col>
          <Col><h1 className="peliculasGrilla_textoLight">Catálogo de Peliculas</h1></Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
          <div className="peliculasGrilla__ItemsContainer">

              {isLoading === true     // evaluamos si "isLoadin" es true, en caso correcto mostrasmos el "?" y sino entramos al ":"
                      
                        ? (
                            <div className="peliculasGrilla__loading">
                                <h3 className="peliculasGrilla_textoLight">C a r g a n d o  . . .</h3>
                                <Spinner animation="grow" className="peliculasGrilla_textoLight"/><Spinner animation="grow" className="peliculasGrilla_textoLight"/><Spinner animation="grow" className="peliculasGrilla_textoLight"/><Spinner animation="grow" className="peliculasGrilla_textoLight"/><Spinner animation="grow" className="peliculasGrilla_textoLight"/><Spinner animation="grow" className="peliculasGrilla_textoLight"/><Spinner animation="grow" className="peliculasGrilla_textoLight"/>
                                {/* <img className="peliculasGrilla__loading-img" src={`/images/loading.gif`} alt="Imagen Pelicula" /> */}
                            </div>
                          )  
                        : movieDBisDown === true         // evaluamos si "movieDBisDown" es true, en caso correcto mostrasmos el "?" y sino entramos al ":"
                        
                                          ? (
                                              <div className="peliculasGrilla__server-down">
                                                  <h3 className="peliculasGrilla_textoLight">El Servidor está caído... Intente más tarde..</h3>
                                                  <img className="peliculasGrilla__server-down-img" src={`/images/serverDown.jpg`} alt="TMDB No Response"/>
                                              </div>
                                            )
                                          : movieDBisWorking === false         // Este punto debe ser revisado ya que para mi esta funcionando a la inversa, ver nota linea 42
                                                                ? (
                                                                    <div className="peliculasGrilla__server-error">
                                                                        <h3 className="peliculasGrilla_textoLight">El Servidor no responde correctamente... Intente más tarde..</h3>
                                                                        <img className="peliculasGrilla__server-error-img" src={`/images/TMDBerror.jpg`} alt="TMDB No Response" />
                                                                    </div>
                                                                  ) 
                                                                : (
                                                                    apiData.map((itemData) => (
                                                                                              <Link to={`/detallepelicula/${itemData.id}`} key={itemData.id}>
                                                                                                  <PeliculasCard cardItemData={itemData} cardItemDataFavoriteStatus={itemData.isFavorite}></PeliculasCard>
                                                                                              </Link>
                                                                                              ))

                                                                    
                                                                  )
              }

          </div>
          {/* incorporamos el componente paginador y como prop pasamos una funcion que sera ejecutada desde paginador (componente hijo) y nos "subira" un valor en el parametro */}
          <Paginador cambiarPagina={onCambiarPagina} dataActualPage={pageNumber} dataTotalPages={totalPages} ></Paginador>
          </Col>
        </Row>
      </Container>
    
    </>
  )
}












