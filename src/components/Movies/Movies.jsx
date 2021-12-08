import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getMoviesSelector,
  getSearchQuery,
  getSuccessAdd,
} from '../../redux/movie/movie-selectors';
import {
  getMovies,
  addMovie,
  removeMovie,
  importMovies,
} from '../../redux/movie/movie-operations';
import { requestSuccess, resetAllError } from '../../redux/movie/movie-slice';

import MoviesForm from './MoviesForm/MoviesForm';
import Modal from '../shared/Modal/Modal';
import MainButton from '../shared/MainButton/MainButton';
import MoviesList from './MoviesList/MoviesList';
import MovieInformation from './MovieInformation/MovieInformation';
import Input from '../shared/Input/Input';
import SearchForm from './SearchForm/SearchForm';

import styles from './Movies.module.css';

const initValue = {
  form: false,
  details: false,
  movieId: '',
};

export default function Movies() {
  const [modalControlls, setModalControlls] = useState(initValue);
  const [file, setFile] = useState(null);

  const isSuccessAdd = useSelector(getSuccessAdd);
  const searchQuery = useSelector(getSearchQuery);
  const items = useSelector(getMoviesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!file) return;

    const formData = new FormData();
    formData.append('movies', file);
    dispatch(importMovies(formData));
  }, [dispatch, file]);

  useEffect(() => {
    dispatch(getMovies(searchQuery));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (!isSuccessAdd) return;

    setModalControlls(prev => ({ ...prev, form: false }));
    dispatch(requestSuccess());
  }, [dispatch, isSuccessAdd]);

  const handleSubmit = movieData => {
    dispatch(addMovie(movieData));
  };

  const handleRemoveMovie = movieId => {
    dispatch(removeMovie(movieId));
  };

  const toggleModal = useCallback(
    key => {
      setModalControlls(prev => ({ ...prev, [key]: !prev[key] }));

      if (key === 'form' && modalControlls.form) {
        dispatch(resetAllError());
      }
    },
    [dispatch, modalControlls.form],
  );

  const pickMovie = movieId => {
    setModalControlls(prev => ({ ...prev, details: !prev.details, movieId }));
  };

  return (
    <div>
      <SearchForm />
      <div className={styles.wrapper}>
        <MainButton
          label="add movie"
          type="button"
          onClick={() => toggleModal('form')}
          className={styles.btn}
        />
        <Input
          type="file"
          name="movies"
          label="import file"
          onChange={e => setFile(e.target.files[0])}
          className={styles.input}
        />
      </div>
      {!!items?.length && (
        <MoviesList
          item={items}
          remove={handleRemoveMovie}
          onItemClick={pickMovie}
        />
      )}
      {modalControlls.form && (
        <Modal closeModal={() => toggleModal('form')}>
          <MoviesForm onSubmit={handleSubmit} />
        </Modal>
      )}
      {modalControlls.details && (
        <Modal closeModal={() => toggleModal('details')}>
          <MovieInformation movieId={modalControlls.movieId} />
        </Modal>
      )}
    </div>
  );
}
