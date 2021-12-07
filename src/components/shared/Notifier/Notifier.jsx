import styles from './Notifier.module.css';

export default function Notifier({ message }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{message}</p>
    </div>
  );
}
