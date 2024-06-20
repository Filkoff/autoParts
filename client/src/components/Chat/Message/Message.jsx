import React, { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { arrayOf, string } from 'prop-types';
import { urlChecker } from '../../../utils/urlChecker';
import styles from './Message.module.scss';

function Message({ message }) {
  const scrollRef = useRef();
  const mesageText = urlChecker(message[0]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mesageText]);

  return (
    <div ref={scrollRef}>
      <div className={styles.messageContainer}>
        <div className={styles.message}>
          <p
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(mesageText) }}
          ></p>
          <p className={styles.messageTime}>{message[1]}</p>
        </div>
      </div>
    </div>
  );
}

Message.propTypes = {
  message: arrayOf(string),
};

export default Message;
