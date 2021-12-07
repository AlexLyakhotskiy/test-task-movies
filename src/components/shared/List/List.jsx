import MainButton from '../MainButton/MainButton';

import styles from './List.module.css';

export default function List({ items, remove = false }) {
  if (remove)
    return (
      <ul>
        {items.map((item, idx) => {
          return (
            <li key={idx} className={styles.formItem}>
              <p>{item}</p>
              <MainButton
                icon="bin"
                onClick={() => remove(idx)}
                className={styles.btn}
              />
            </li>
          );
        })}
      </ul>
    );

  if (!remove)
    return (
      <ul>
        {items.map(({ name, id }) => {
          return (
            <li key={id} className={styles.item}>
              <p>{name}</p>
            </li>
          );
        })}
      </ul>
    );
}
