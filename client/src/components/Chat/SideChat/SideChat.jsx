import React from 'react';
import { useSelector } from 'react-redux';
import SideMessage from '../SideMessage/SideMessage';
import styles from './SideChat.module.scss';

function SideChat() {
  const chats = useSelector((state) => state.chat.chats);
  return (
    <div className={styles.container}>
      <div>
        {chats.map((chat) => (
          <SideMessage key={chat.id} message={chat} />
        ))}
      </div>
    </div>
  );
}

export default SideChat;
