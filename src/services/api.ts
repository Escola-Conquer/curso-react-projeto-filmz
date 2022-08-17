import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_THE_MOVIE_DB_API_KEY,
    language: 'pt-BR',
    region: 'BR',
    include_adult: false
  }
});

export default api;
