import MainButton from '../../../shared/MainButton/MainButton';

import styles from './MovieItem.module.css';

export default function MovieItem({ item, remove, onItemClick }) {
  const { title, year, id } = item;
  return (
    <li className={styles.item}>
      <p className={styles.title}>{title}</p>
      <p className={styles.year}>year: {year}</p>
      <div className={styles.wrapper}>
        <MainButton
          icon="search"
          onClick={() => onItemClick(id)}
          className={styles.searchBtn}
        />
        <MainButton
          icon="bin"
          onClick={() => remove(id)}
          className={styles.removeBtn}
        />
      </div>
    </li>
  );
}
