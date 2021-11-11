import React from 'react';
import shortid from 'shortid';
import { useSelector } from 'react-redux';
import { arrayOf, object } from 'prop-types';
import Message from '../Message/Message';
import styles from './MessagesContainer.module.scss';

function MessagesContainer({ chats }) {
  const current = useSelector((state) => state.chat.currentPerson);
  const currentChat = chats.find((item) => item.person === current.name);
  return (
    <div className={styles.container}>
      {currentChat ? (
        <div className={styles.messagesContainer}>
          {currentChat.messages.map((message) => (
            <Message message={message} key={shortid.generate()} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

MessagesContainer.propTypes = {
  chats: arrayOf(object),
};

export default MessagesContainer;
