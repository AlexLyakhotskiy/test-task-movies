import { useEffect, useState } from 'react';

import { apiGetMovieById } from '../../../utils/apiServices';

import List from '../../shared/List/List';

import styles from './MovieInformation.module.css';

export default function MovieInformation({ movieId }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    apiGetMovieById(movieId).then(setMovie);
  }, [movieId]);

  return (
    <div className={styles.wrapper}>
      {!movie ? (
        <span>loading...</span>
      ) : (
        <div>
          <p className={styles.text}>title: {movie.title}</p>
          <p className={styles.text}>year: {movie.year}</p>
          <p className={styles.text}>format: {movie.format}</p>
          <p className={styles.text}>actors:</p>
          {!!movie.actors.length && <List items={movie.actors} />}
        </div>
      )}
    </div>
  );
}
