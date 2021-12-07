import MovieItem from './MovieItem/MovieItem';

import styles from './MoviesList.module.css';

export default function MoviesList({ item, remove, onItemClick }) {
  return (
    <ul className={styles.list}>
      {!!item &&
        item.map(item => (
          <MovieItem
            key={item.id}
            item={item}
            remove={remove}
            onItemClick={onItemClick}
          />
        ))}
    </ul>
  );
}
