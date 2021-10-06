import React from 'react';
import { useSelector } from 'react-redux';
import Message from '../Message/Message';
import styles from './MessagesContainer.module.scss';

function MessagesContainer() {
  const chats = useSelector((state) => state.chat.chats);
  const current = useSelector((state) => state.chat.currentPerson);
  const currentChat = chats.find((item) => item.person === current.name);
  return (
    <div className={styles.container}>
      {currentChat ? (
        <div className={styles.messagesContainer}>
          {currentChat.messages.map((message, index) => (
            <Message message={message} key={index} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default MessagesContainer;
