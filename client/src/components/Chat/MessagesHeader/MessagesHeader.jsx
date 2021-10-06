import React from 'react';
import { useSelector } from 'react-redux';
import styles from './MessagesHeader.module.scss';

function MessagesHeader() {
  const current = useSelector((state) => state.chat.currentPerson);
  const headerInfo = (
    <div className={styles.person}>
      <img
        className={styles.avatar}
        src="../../../../assets/images/avatar.jpg"
        alt="avatar"
      />
      <h2>{current.name}</h2>
    </div>
  );

  return <div>{current.name ? headerInfo : null}</div>;
}

export default MessagesHeader;
