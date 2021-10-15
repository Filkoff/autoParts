import React, { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import { urlChecker } from '../../../utils/urlChecker';
import PropTypes from 'prop-types';
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
  message: PropTypes.arrayOf(PropTypes.string),
};

export default Message;
