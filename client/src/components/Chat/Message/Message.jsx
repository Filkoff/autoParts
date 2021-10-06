import React, { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { urlChecker } from '../../../utils/urlChecker';
import styles from './Message.module.scss';

function Message({ message }) {
  const scrollRef = useRef();
  const mes = urlChecker(message[0]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mes]);

  return (
    <div ref={scrollRef}>
      <div className={styles.messageContainer}>
        <div className={styles.message}>
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(mes) }}></p>
          <p className={styles.messageTime}>{message[1]}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
