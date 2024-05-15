
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

    

      <Card bg="dark" key="dark">
        
        
        <Card.Img variant="top" src={cardItemData.poster_path != null
            ? `https://image.tmdb.org/t/p/w500${cardItemData.poster_path}`
            : `/images/emptyPoster.svg`} />
        <Card.Body>
          <Card.Text className='peliculasCard_textoLight'>
            <h3>{cardItemData.title}</h3>
            <p>Puntuacion: {(cardItemData.vote_average).toFixed(1)}</p>
          <div className='peliculasCard_textoLight'>
              {isFavorite == true   ?<iconify-icon onClick={(event) => removeFavoriteClickHandler(event, cardItemData.id)} style={{fontSize: "2rem", color: "crimson"}} icon="streamline:heart-solid"></iconify-icon>
                                    :<iconify-icon onClick={(event) => addFavoriteClickHandler(event, cardItemData.id)} style={{fontSize: "2rem"}} icon="streamline:heart"></iconify-icon>
              }
            </div>
          </Card.Text>
        </Card.Body>
      </Card> 

  )

}

{/* <div style={{position: "absolute", top: "1%", right: "5%"}} className='peliculasCard_textoLight'>
              {isFavorite == true   ?<iconify-icon onClick={(event) => removeFavoriteClickHandler(event, cardItemData.id)} style={{fontSize: "2rem", color: "crimson"}} icon="streamline:heart-solid"></iconify-icon>
                                    :<iconify-icon onClick={(event) => addFavoriteClickHandler(event, cardItemData.id)} style={{fontSize: "2rem"}} icon="streamline:heart"></iconify-icon>
              }
            </div> */}