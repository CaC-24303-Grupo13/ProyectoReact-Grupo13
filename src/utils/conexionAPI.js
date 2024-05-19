

export const getDataMovieDB = async (endpointURL, pagenumber, language, searchValue) => {
    
    // Diferentes tipos de Consulta a la API segun URL
    // const url = 'https://api.themoviedb.org/3  /  trending/movie/day     ?language=en-US     &page=1';       //  Tendencia Diaria        https://developer.themoviedb.org/reference/trending-movies
    // const url = 'https://api.themoviedb.org/3  /  trending/movie/week    ?language=en-US     &page=1';       //  Tendencia Semanal
    // const url = 'https://api.themoviedb.org/3  /  movie/popular          ?language=es-AR     &page=1';       //  Populares               https://developer.themoviedb.org/reference/movie-popular-list
    // const url = 'https://api.themoviedb.org/3  /  movie/now_playing      ?language=es-AR     &page=1';       //  En Cartelera            https://developer.themoviedb.org/reference/movie-now-playing-list
    // const url = 'https://api.themoviedb.org/3  /  movie/upcoming         ?language=es-AR     &page=1';       //  Proximos Estrenos       https://developer.themoviedb.org/reference/movie-upcoming-list
    // const url = 'https://api.themoviedb.org/3  /  movie/top_rated        ?language=es-AR     &page=1';       //  Mejores Puntuadas       https://developer.themoviedb.org/reference/movie-top-rated-list
    // const url = `https://api.themoviedb.org/3  /  movie/${idpelicula}    ?language=es-AR`;                   //  Info 1 Pelicula         https://developer.themoviedb.org/reference/movie-details
    

    // Dependiendo se si viene una busqueda la URL de consulta es una u otra
    let url = ""
        if (searchValue != null) {
            // Si en "valor buscado" viene algo, osea, diferente de null hacemos esto (Es decir BUSCAMOS)
            url = `${import.meta.env.VITE_MOVIEDB_API_BASE_URL}/search/movie?query=${searchValue}&api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&page=${pagenumber}`;         //  URL Busqueda
        } else {
            // Si en "valor buscado" no viene nada, osea es null, es porque estamos listando
            url = `${import.meta.env.VITE_MOVIEDB_API_BASE_URL}/${endpointURL}?language=${language}&page=${pagenumber}`;                        //  URL Dinamica
        }

    
    // parametros de acceso para consultar a la api
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_API_TOKEN}`
        }
    };
    

    try {    
        
        const apiResponse = await axios.get(url, options)
        const fetchData = apiResponse.data
        
        // Forzamos una demora para retornar la respuesta de la API  (Es solo para ver el "cargando...")
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        //console.log(fetchData);      // Habilitar este console log para hacer los estilos asi se ve el JSON de que info recibimos y podemos usar

        return {
            data: fetchData,
            isLoadingApiData: false,
            isWorkingApi: true,
            movieDBdown: false
        }
    
    } catch (error) {

        if (error.code == "ERR_BAD_REQUEST"){
            console.log("Mala Ruta");
            return {
                data: [],
                isLoadingApiData: false,
                isWorkingApi: false,        //  Aca ver porque deberia ser TRUE el valor a pasar, ya que si la ruta es mala la API esta funcional pero no tenemos respuesta buena, por lo cual en pantalla renderizamos condicionalmente meme de los simpsons con el server
                movieDBdown: false
            }
        }else if (error.code == "ERR_NETWORK"){
            console.log("Server Caido");
            return {
                data: [],
                isLoadingApiData: false,
                isWorkingApi: false,
                movieDBdown: true
            }
        }

    }
}
