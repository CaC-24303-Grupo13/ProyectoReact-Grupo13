
import Card from 'react-bootstrap/Card';



export const PeliculasCard = ({cardItemData}) => {


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
          </Card.Text>
        </Card.Body>
      </Card> 






    
    </div>
  )

}