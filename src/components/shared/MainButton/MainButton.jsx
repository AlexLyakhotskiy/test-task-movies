import Svg from '../Svg/Svg';

import styles from './MainButton.module.css';

export default function MainButton({
  type = 'button',
  label,
  className,
  isMainButton = true,
  onClick,
  icon = false,
}) {
  return (
    <button
      type={type}
      className={`${
        isMainButton ? styles.mainBtn : styles.secondBtn
      } ${className} ${icon && styles.iconBtn}`}
      onClick={onClick}
    >
      {label}
      {icon && <Svg icon={icon} className={styles.icon} />}
    </button>
  );
}
