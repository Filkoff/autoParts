import React from 'react';
import { useSelector } from 'react-redux';
import Message from '../Message/Message';
import styles from './MessagesContainer.module.scss';
import shortid from 'shortid';
import { arrayOf, object } from 'prop-types';

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
