import React from 'react';
import { arrayOf, object } from 'prop-types';
import SideMessage from '../SideMessage/SideMessage';
import styles from './SideChat.module.scss';

function SideChat({ chats }) {
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

SideChat.propTypes = {
  chats: arrayOf(object),
};

export default SideChat;
