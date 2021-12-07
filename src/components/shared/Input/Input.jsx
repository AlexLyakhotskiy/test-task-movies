import styles from './Input.module.css';

export default function Input({
  name,
  value,
  onChange,
  label,
  error,
  className = '',
  type = 'text',
}) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <input
        type={type}
        className={`${styles.input} ${error && styles.inputError}`}
        placeholder=" "
        name={name}
        id={name}
        onChange={onChange}
        value={value}
      />
      {error && <span className={styles.error}>{error}</span>}
      <label
        htmlFor={name}
        className={`${styles.label} ${error && styles.labelError}`}
      >
        {label}
      </label>
    </div>
  );
}
