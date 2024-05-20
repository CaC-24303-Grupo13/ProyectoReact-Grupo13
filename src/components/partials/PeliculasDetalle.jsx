import { useState, useEffect } from 'react';
import { getDataMovieDB } from '../../utils/conexionAPI';
import { useParams } from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';



 /* --- Función para crear el modal que se va a usar para ver el trailer de la pelicula ---  */
function TrailerModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton><Modal.Title id="contained-modal-title-vcenter">Trailer: {props.tituloPelicula}</Modal.Title></Modal.Header>
      <Modal.Body>
        {props.videoTrailer ? 
          props.videoTrailer : 
          <p>Lo sentimos, no pudimos encontrar el trailer.</p>}
      </Modal.Body>
      <Modal.Footer><Button variant="light" onClick={props.onHide}>Cerrar</Button></Modal.Footer>
    </Modal>
  );
}



export default function PeliculasDetalle() {
    
  const { idpelicula } = useParams();  // capturamos el ID de la pelicula desde la URL  (el nombre de la variable desestructurada debe coincidir con el nombre que le asignamos en la definicion de rutas con React Router DOM)

  // definimos los argumentos para enviar como parametros a la consulta en la API
  const APIendpoint = `movie/${idpelicula}`
  const APIlanguage = "es-AR"
  const pageNumber = 1
  const searchValue = null

  const [movieData, setmovieData] = useState([])      // inicializamos la variable movieData como un array vacio que luego sera "completado" con el useEffect y la arrow function
  const [isLoading, setisLoading] = useState(true)    // inicializamos el isLoading como true para que se muestre directamente el spinner
  const [modalShow, setModalShow] = useState(false);

  
  useEffect(() => {   // Al cargarse este componente se ejecuta este evento secundario 1 sola vez
    
    const fetchData = async () => {   // definimos la arrow function que es la consulta a la API
      const { data, isLoadingApiData } = await getDataMovieDB(APIendpoint, 1, APIlanguage, searchValue)
      setmovieData(data)                  // actualizamos (guardamos) los resultados de peliculas
      setisLoading(isLoadingApiData)      // establecemos que "isLoading" es false (termino) para que ahora muestre la data
    }

    fetchData()   // ejecutamos la arrow function





  }, [])    // no pasamos ninguna dependencia que haga que se vuelva a ejecutar este evento secundario, no lo necesitamos


  
  return (

    <main className="app_container peliculasDetalle__main">

          {/* Leyenda que indica que componente es, Esto se BORRA */}
          {/* <span style={{fontSize: '.8rem', color: 'blue'}}>AZUL: Componente Detalles de Pelicula</span> */}
        
          { isLoading == true     // evaluamos si "isLoading" es true, como asi lo establecimos se mostrara "?" hasta que se actualiza el useState del mismo y pasamos al ":"

              ?   <div className="peliculasDetalle__loading">
                      <h3 className="peliculasDetalle__title">C a r g a n d o  . . .</h3>
                      <div className="peliculasDetalle__spinnerContainer">
                                    <Spinner animation="grow" className="peliculasGrilla_textoLight"/>
                                    <Spinner animation="grow" className="peliculasGrilla_textoLight"/>
                                    <Spinner animation="grow" className="peliculasGrilla_textoLight"/>
                                    <Spinner animation="grow" className="peliculasGrilla_textoLight"/>
                                    <Spinner animation="grow" className="peliculasGrilla_textoLight"/>
                                    <Spinner animation="grow" className="peliculasGrilla_textoLight"/>
                                    <Spinner animation="grow" className="peliculasGrilla_textoLight"/>
                        </div>
                  </div>

              :   <div className="container peliculasDetalle__flex">
                  <Container>
                    <Row>
                      <Col sm={4}>

                      {/* Aca hacer que el condicional no solo muestre una imagen vacia sino que tambien cuando viene data mala, mostrar que la pelicula no existe o redirigir al home */}

                      { movieData.poster_path != null
                          ?  <Image fluid thumbnail src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} alt="Imagen Pelicula"/>
                          :  <Image fluid thumbnail src={`/images/emptyPoster.svg`} alt="Imagen Pelicula" />
                        }
                      </Col>

                      <Col sm={8} className="peliculasDetalle_textoLight ">
                              {/* Aca ver que data mostrar, seguramente faltan cosas o sobran cosas */}

                              <h3>{movieData.title}</h3>
                              <h4>{movieData.tagline}</h4>
                              <p>Titulo original: {movieData.original_title}</p>
                              <p>{movieData.overview}</p>
                                <Button variant="primary" onClick={() => setModalShow(true)}>Ver trailer</Button>
                                <TrailerModal tituloPelicula={movieData.title} videoTrailer={movieData.video} show={modalShow} onHide={() => setModalShow(false)}/>
                                
                              <Stack direction="horizontal" gap={3}>
                                <div className="p-2 ms-auto">Géneros:</div> 
                                {movieData.genres.map( genre => (
                                  <div className="p-2">{genre.name}</div>
                                ))}
                              </Stack>
                              <Stack direction="horizontal" gap={3}>
                                <div className="p-2 ms-auto">Lanzamiento: {movieData.release_date}</div>
                                <div className="p-2">Puntuación promedio: {movieData.vote_average}</div>
                                <div className="p-2">Cantidad puntuaciones: {movieData.vote_count}</div>
                              </Stack>

                            {/* <p>Url ID: {idpelicula}</p>    */}      {/*   Este ID se obtiene desde la URL     */}
                            {/* <p>Data ID: {movieData.id}</p>    */}   {/*   Este ID se obtiene desde la Data de la API     */}
                              
                      </Col>
                    </Row>
                  </Container>
                  
                  </div>
          }
      
    </main>
  )
}