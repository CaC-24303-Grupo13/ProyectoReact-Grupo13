export const PeliculasCard = ({cardItemData}) => {


  return (

    <div className="peliculasCard__container">

        {/* Leyenda que indica que componente es, Esto se BORRA */}
        <span style={{fontSize: '.8rem', color: 'blue'}}>AZUL: Componente Card de Pelicula</span>

        <h3>{cardItemData.title}</h3>
        
        <p>Puntuacion: {(cardItemData.vote_average).toFixed(1)}</p>
        
        {cardItemData.poster_path != null
            ? <img className="peliculasCard__poster-img" src={`https://image.tmdb.org/t/p/w500/${cardItemData.poster_path}`} alt="Imagen Pelicula"/>
            : <img className="peliculasCard__poster-img" src={`./images/emptyPoster.svg`} alt="Imagen Pelicula"/>
        }
    
    </div>
  )

}