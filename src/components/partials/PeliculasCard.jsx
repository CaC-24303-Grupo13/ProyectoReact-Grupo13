
import Card from 'react-bootstrap/Card';

import { addToFavorites } from '../../utils/getFavorites';    //  Importamos la funcion creada en el Helper o almacenador de funciones de favoritos
import { db, auth } from "../../utils/firebaseCredentials";   //  Importamos la instancia del servicio incializado con getAuth y guardado en la constante auth
import { onAuthStateChanged } from "firebase/auth";           //  Importamos los modulos/funciones a utilizar de Firebase Authentication 
import { useState } from 'react';


export const PeliculasCard = ({cardItemData}) => {


  const [isFavorite, setIsFavorite] = useState(false)

  const addFavoriteClickHandler = (event, movieId) => {
    event.stopPropagation();  // evitamos que se propague el evento de clic hacia arriba
    event.preventDefault();   // evitamos el comportamiento por defecto de recargar la pagina
      onAuthStateChanged(auth, async (fbLogedUser) => {   //onAuthStateChanged: función de Firebase que escucha los cambios en el estado de autenticación. Cuando se detecta un cambio (LogIn o LogOut), ejecuta la función de devolución de llamada que le pasas como segundo argumento (Callback).
        addToFavorites(fbLogedUser.email, movieId)
      });
      setIsFavorite(!isFavorite)
  };

  const removeFavoriteClickHandler = (event, movieId) => {
  };


  return (

    <div className="peliculasCard__container">

        {/* Leyenda que indica que componente es, Esto se BORRA */}
        {/* <span style={{fontSize: '.8rem', color: 'blue'}}>AZUL: Componente Card de Pelicula</span> */}

        {/* <h3>{cardItemData.title}</h3>
        
        <p>Puntuacion: {(cardItemData.vote_average).toFixed(1)}</p>
         */}
        {/* {cardItemData.poster_path != null
            ? <img className="peliculasCard__poster-img" src={`https://image.tmdb.org/t/p/w500${cardItemData.poster_path}`} alt="Imagen Pelicula"/>
            : <img className="peliculasCard__poster-img" src={`/images/emptyPoster.svg`} alt="Imagen Pelicula"/>
        }
        <h3>{cardItemData.title}</h3>
        
        <p>Puntuacion: {(cardItemData.vote_average).toFixed(1)}</p> */}
        
        {/* variante sin shadow */}
        {/* <Card bg="dark" key="dark" text="light" style={{ width: '18rem' }} className="mb-2">
        <Card.Img variant="top" src={cardItemData.poster_path != null
            ? `https://image.tmdb.org/t/p/w500${cardItemData.poster_path}`
            : `/images/emptyPoster.svg`} />
        <Card.Body>
          <Card.Text>
            <h3>{cardItemData.title}</h3>
            <p>Puntuacion: {(cardItemData.vote_average).toFixed(1)}</p>
          </Card.Text>
        </Card.Body>
      </Card>
 */}
          {/* Variante con color al costado */}
      <Card bg="dark" key="dark">
        <Card.Img variant="top" src={cardItemData.poster_path != null
            ? `https://image.tmdb.org/t/p/w500${cardItemData.poster_path}`
            : `/images/emptyPoster.svg`} />
        <Card.Body>
          <Card.Text className='peliculasCard_textoLight'>
            <h3>{cardItemData.title}</h3>
            <p>Puntuacion: {(cardItemData.vote_average).toFixed(1)}</p>

{/* desde aca */}
            <div style={{position: "absolute", bottom: "0", left: "0"}}>
              {isFavorite == true   ?<iconify-icon onClick={(event) => removeFavoriteClickHandler(event, cardItemData.id)} style={{fontSize: "2rem", color: "crimson"}} icon="streamline:heart-solid"></iconify-icon>
                                    :<iconify-icon onClick={(event) => addFavoriteClickHandler(event, cardItemData.id)} style={{fontSize: "2rem"}} icon="streamline:heart"></iconify-icon>
              }
            </div>
{/* hasta aca */}

          </Card.Text>
        </Card.Body>
      </Card> 






    
    </div>
  )

}