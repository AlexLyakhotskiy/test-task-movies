import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSearchQuery } from '../../../redux/movie/movie-slice';

import Input from '../../shared/Input/Input';
import MainButton from '../../shared/MainButton/MainButton';

import styles from './SearchForm.module.css';

export default function SearchForm() {
  const [searchQuery, setQuery] = useState('');

  const dispatch = useDispatch();

  const handleChangeInput = e => {
    const stringInLowerCase = e.target.value.toLowerCase();

    setQuery(stringInLowerCase);
  };

  const addQuery = () => {
    dispatch(setSearchQuery(searchQuery.trim()));
  };

  const clearQuery = () => {
    dispatch(setSearchQuery(''));
    setQuery('');
  };

  return (
    <>
      <form className={styles.form}>
        <div className={styles.wrapper}>
          <Input
            label="Find movies by title or actor name"
            name="searchQuery"
            value={searchQuery}
            onChange={handleChangeInput}
          />
          <MainButton
            type="button"
            icon="search"
            className={styles.serchBtn}
            onClick={addQuery}
          />
          <MainButton
            type="button"
            icon="cross"
            onClick={clearQuery}
            className={styles.clearBtn}
          />
        </div>
      </form>
    </>
  );
}
