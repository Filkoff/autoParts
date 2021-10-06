import React from 'react';
import styles from './Modal.module.scss';

function Modal({ show, setShow, children }) {
  return (
    <div
      className={show ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={() => setShow(false)}
    >
      <div
        className={show ? `${styles.content} ${styles.active}` : styles.content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
