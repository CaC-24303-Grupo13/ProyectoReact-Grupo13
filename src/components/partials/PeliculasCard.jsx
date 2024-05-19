
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"

import { addToFavorites, removeFromFavorites } from '../../utils/getFavorites';    //  Importamos la funcion creada en el Helper o almacenador de funciones de favoritos
import { db, auth } from "../../utils/firebaseCredentials";   //  Importamos la instancia del servicio incializado con getAuth y guardado en la constante auth
import { onAuthStateChanged } from "firebase/auth";           //  Importamos los modulos/funciones a utilizar de Firebase Authentication 
import { useState } from 'react';


export const PeliculasCard = ({cardItemData, cardItemDataFavoriteStatus}) => {

  const [isFavorite, setIsFavorite] = useState(cardItemDataFavoriteStatus)

  const addFavoriteClickHandler = (event, movieId) => {
    event.stopPropagation();  // evitamos que se propague el evento de clic hacia arriba
    event.preventDefault();   // evitamos el comportamiento por defecto de recargar la pagina
      onAuthStateChanged(auth, async (fbLogedUser) => {   //onAuthStateChanged: función de Firebase que escucha los cambios en el estado de autenticación. Cuando se detecta un cambio (LogIn o LogOut), ejecuta la función de devolución de llamada que le pasas como segundo argumento (Callback).
        addToFavorites(fbLogedUser.email, movieId)
      });
      setIsFavorite(!isFavorite)  // Invertimos el estado del corazon
  };

  const removeFavoriteClickHandler = (event, movieId) => {
    event.stopPropagation();  // evitamos que se propague el evento de clic hacia arriba
    event.preventDefault();   // evitamos el comportamiento por defecto de recargar la pagina
    onAuthStateChanged(auth, async (fbLogedUser) => {   //onAuthStateChanged: función de Firebase que escucha los cambios en el estado de autenticación. Cuando se detecta un cambio (LogIn o LogOut), ejecuta la función de devolución de llamada que le pasas como segundo argumento (Callback).
      removeFromFavorites(fbLogedUser.email, movieId)
    });
    setIsFavorite(!isFavorite)  // Invertimos el estado del corazon
  };


  return (
     
      <Link to={`/detallepelicula/${cardItemData.id}`} >
        <article className="card bg-dark peliculasCard__container">
          <figure className="card-img-top peliculasCard__poster">
            {cardItemData.poster_path != null
                ? <img className="peliculasCard__poster-img" src={`https://image.tmdb.org/t/p/w500${cardItemData.poster_path}`} alt={`Poster ${cardItemData.title}`}/>
                : <img className="peliculasCard__poster-img" src={`/images/emptyPoster.svg`} alt="Poster no encontrado"/>
            }
          </figure>
          <figcaption className="card-body peliculasCard_textoLight card-text">
              <h3>{cardItemData.title}</h3>
              <p>Puntuacion: {(cardItemData.vote_average).toFixed(1)}</p>
          </figcaption>
          {isFavorite == true   ?<iconify-icon onClick={(event) => removeFavoriteClickHandler(event, cardItemData.id)} icon="streamline:heart-solid" class="peliculasCard__Favorite favoriteTrue"></iconify-icon>
                                :<iconify-icon onClick={(event) => addFavoriteClickHandler(event, cardItemData.id)} icon="streamline:heart" class="peliculasCard__Favorite favoriteFalse"></iconify-icon>
          }
        </article>
      </Link>

  )

}