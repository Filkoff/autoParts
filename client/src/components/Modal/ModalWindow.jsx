import React from 'react';
import { bool, func, node } from 'prop-types';
import styles from './ModalWindow.module.scss';

function ModalWindow({ show, setShow, children }) {
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

ModalWindow.propTypes = {
  show: bool,
  setShow: func,
  children: node,
};

export default ModalWindow;
