import styles from './Select.module.css';

export default function Select({
  name,
  value,
  onChange,
  label,
  error,
  className = '',
  option,
}) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <select
        className={`${styles.input} ${error && styles.inputError}`}
        placeholder=" "
        name={name}
        id={name}
        onChange={onChange}
        value={value}
      >
        {option.map((item, idx) => (
          <option key={idx} value={item}>
            {item}
          </option>
        ))}
      </select>
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
