import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const apiToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = token;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

// ============================================================

export async function apiRegisterUser(userData) {
  const { data } = await axios.post('/users', userData);

  if (!data.status) return Promise.reject(data.error.fields);

  apiToken.set(data.token);
  return;
}

export async function apiLoginUser(userData) {
  const { data } = await axios.post('/sessions', userData);

  if (!data.status) return Promise.reject(data.error.fields);

  apiToken.set(data.token);
  return;
}

// ============================================================

export async function apiGetMovieById(movieId) {
  const { data } = await axios.get(`/movies/${movieId}`);

  if (!data.status) return Promise.reject(data.error.code);

  return data.data;
}

export async function apiGetMovies(searchQuery) {
  let params = '?sort=title';

  if (searchQuery) params += `&search=${searchQuery}`;

  const { data } = await axios.get(`/movies${params}`);

  if (!data.status) return Promise.reject(data.error.code);

  return data;
}

export async function apiAddMovie(movieData) {
  const { data } = await axios.post('/movies', movieData);

  if (!data.status) return Promise.reject(data.error);

  return data;
}

export async function apiAddMoviesList(moviesData) {
  const { data } = await axios.post('/movies/import', moviesData);

  if (!data.status) return Promise.reject(data.error.code);

  return data;
}

export async function apiDeleteMovie(movieId) {
  const { data } = await axios.delete(`/movies/${movieId}`);

  if (!data.status) return Promise.reject(data.error.code);

  return;
}
