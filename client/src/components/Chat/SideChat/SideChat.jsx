import React from 'react';
import SideMessage from '../SideMessage/SideMessage';
import styles from './SideChat.module.scss';
import PropTypes from 'prop-types';

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
  chats: PropTypes.arrayOf(PropTypes.object),
};

export default SideChat;
