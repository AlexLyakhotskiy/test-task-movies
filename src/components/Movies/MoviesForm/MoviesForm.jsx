import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getmoviesInputErrors } from '../../../redux/movie/movie-selectors';
import { resetError } from '../../../redux/movie/movie-slice';
import {
  checkForSpacesAtBeginAndEnd,
  checkForSpecialCharacters,
} from '../../../utils/functions';

import Input from '../../shared/Input/Input';
import List from '../../shared/List/List';
import MainButton from '../../shared/MainButton/MainButton';
import Select from '../../shared/Select/Select';

import styles from './MoviesForm.module.css';

const format = ['', 'DVD', 'VHS', 'Blu-Ray'];

const initValue = {
  title: '',
  year: '',
  format: '',
  actor: '',
  actors: [],
};

const initError = {
  title: '',
  year: '',
  format: '',
  actor: '',
};

export default function MoviesForm({ onSubmit }) {
  const [movieData, setMovieData] = useState(initValue);
  const [errors, setErrors] = useState(initError);

  const dispatch = useDispatch();
  const inputErrors = useSelector(getmoviesInputErrors);

  const handleSubmit = e => {
    e.preventDefault();

    const hasError = Object.values(errors).some(e => e);
    if (hasError) return;

    onSubmit(movieData);
  };

  const handleChangeInput = e => {
    const { name, value } = e.target;

    setErrors(prev => ({ ...prev, [name]: '' }));

    checkForSpecialCharacters(name, value, setErrors);
    checkForSpacesAtBeginAndEnd(name, value, setErrors);

    setMovieData(prev => ({ ...prev, [name]: value }));

    const isErrorExist = inputErrors[name];
    if (isErrorExist) {
      dispatch(resetError(name));
    }
  };

  const handleAddActor = () => {
    if (!movieData.actor.trim()) return;

    if (errors.actor) return;

    setMovieData(prev => ({
      ...prev,
      actor: '',
      actors: [...prev.actors, prev.actor],
    }));
  };

  const removeActor = actorId => {
    setMovieData(prev => ({
      ...prev,
      actors: prev.actors.filter((e, idx) => idx !== actorId),
    }));
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          label="title"
          error={errors.title || inputErrors.title}
          value={movieData.title}
          onChange={handleChangeInput}
          className={styles.input}
        />
        <Input
          name="year"
          label="year"
          error={errors.year || inputErrors.year}
          value={movieData.year}
          onChange={handleChangeInput}
          className={styles.input}
        />
        <Select
          name="format"
          label="format"
          error={errors.format || inputErrors.format}
          value={movieData.format}
          onChange={handleChangeInput}
          className={styles.input}
          option={format}
        />
        <Input
          name="actor"
          label="actor"
          error={errors.actor}
          value={movieData.actor}
          onChange={handleChangeInput}
          className={styles.input}
        />
        <div className={styles.btnWrapper}>
          <MainButton
            onClick={handleAddActor}
            isMainButton={false}
            label="add actor"
            className={styles.btn}
          />
          <MainButton label="add movie" type="submit" className={styles.btn} />
        </div>
        {!!movieData.actors && (
          <List items={movieData.actors} remove={removeActor} />
        )}
      </form>
    </div>
  );
}
