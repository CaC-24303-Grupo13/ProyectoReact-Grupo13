import React, { useEffect, useState } from 'react';

import "../../../public/css/partials/recomendados.css"

const API_BASE_URL = import.meta.env.VITE_MOVIEDB_API_BASE_URL;
const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;






const Recomendados = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
        try {
            const [dailyResponse, weeklyResponse, topRatedResponse] = await Promise.all([
              fetch(`${API_BASE_URL}/trending/movie/day?api_key=${API_KEY}`),
              fetch(`${API_BASE_URL}/trending/movie/week?api_key=${API_KEY}`),
              fetch(`${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
            ]);
        
            const [dailyData, weeklyData, topRatedData] = await Promise.all([
              dailyResponse.json(),
              weeklyResponse.json(),
              topRatedResponse.json()
            ]);
        
            const combinedMovies = [
              ...dailyData.results.slice(0, 2),
              ...weeklyData.results.slice(0, 2),
              ...topRatedData.results.slice(0, 2)
            ];
        
            setMovies(combinedMovies);
          } catch (error) {
            console.error('Error fetching movies:', error);
          }
        };

    fetchMovies();
  }, []);

  return (
    <div className="recomendados__container">
      {movies.map((movie) => (
        <div key={movie.id} className="card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="card-img-top"
          />
        </div>
      ))}
    </div>
  );
};

export default Recomendados;
