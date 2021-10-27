import React from 'react';
import SideMessage from '../SideMessage/SideMessage';
import styles from './SideChat.module.scss';
import { arrayOf, object } from 'prop-types';

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
