import styles from './Container.module.css';

const Container = ({ children, className = null }) => (
  <div className={`${styles.container} ${className}`}>{children}</div>
);

export default Container;
