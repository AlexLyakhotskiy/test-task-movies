import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import Svg from '../Svg/Svg';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ closeModal, children }) {
  const handleKeyDown = useCallback(
    ({ code }) => code === 'Escape' && closeModal(),
    [closeModal],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, closeModal]);

  function onCloseBtnClick() {
    closeModal();
  }

  function handleBackdropClick(e) {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  }

  return createPortal(
    <div onMouseDown={handleBackdropClick} className={styles.overlay}>
      <div className={styles.modal}>
        <button
          onClick={onCloseBtnClick}
          type="button"
          aria-label="close-button"
          className={styles.btn}
        >
          <Svg icon="cross" className={styles.icon} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
}

export default Modal;
