

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

        
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_MOVIEDB_API_TOKEN}`
        }
    };
    
    try {
        
        
        const response = await axios.get(url, options)
        const fetchData = response.data
        
        // Forzamos demora para retornar la respuesta de la API, normalmente esto no se haria, ya que no queremos ninguna demora (Es solo para ver el "cargando...")
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        //console.log(fetchData);      // Habilitar este console log para hacer los estilos asi se ve que info recibimos y podemos usar

        if (fetchData.success == false) {
            return {
                data: [],
                isLoadingApiData: false,
                isWorkingApi: false,
                movieDBdown: false
            }
        } else {
            return {
                data: fetchData,
                isLoadingApiData: false,
                isWorkingApi: true,
                movieDBdown: false
            }
        }
    
        
    } catch (error) {
        
        // Nota: Aqui ver como manejar el error enviando algun parametro para utilizar un renderizado condicional y mostrar pantalla de error
        console.error('Error al obtener datos!', error);
        return {
            data: [],
            isLoadingApiData: false,
            isWorkingApi: false,
            movieDBdown: true
        }

    }
}
