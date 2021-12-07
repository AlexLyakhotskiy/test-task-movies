import { useState } from 'react';

import Input from '../../shared/Input/Input';
import MainButton from '../../shared/MainButton/MainButton';

import styles from './SearchForm.module.css';

export default function SearchForm({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeInput = e => {
    const stringInLowerCase = e.target.value.toLowerCase();

    setSearchQuery(stringInLowerCase);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(searchQuery.trim());
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.wrapper}>
          <Input
            label="Find movies by title or actor name"
            name="searchQuery"
            value={searchQuery}
            onChange={handleChangeInput}
          />
          <MainButton type="submit" icon="search" className={styles.btn} />
        </div>
      </form>
    </>
  );
}
