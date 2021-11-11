import React from 'react';
import { shape, arrayOf, number, string } from 'prop-types';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setCurrentPerson } from '../../../reducers/chatReducer';
import styles from './SideMessage.module.scss';

function SideMessage({ message }) {
  const dispatch = useDispatch();
  const lastMessage = message.messages[message.messages.length - 1];
  return (
    <NavLink to={`/chat/${message.id}`}>
      <div
        onClick={() => dispatch(setCurrentPerson(message.id, message.person))}
        className={styles.container}
      >
        <div className={styles.avatarContainer}>
          <img
            className={styles.avatar}
            src="/assets/images/avatar.jpg"
            alt="avatar"
          />
        </div>
        <div className={styles.message}>
          <div className={styles.messageTime}>{lastMessage[1]}</div>
          <p className={styles.name}>{message.person}</p>

          <p>{lastMessage[0]}</p>
        </div>
      </div>
    </NavLink>
  );
}

SideMessage.propTypes = {
  message: shape({
    id: number,
    person: string,
    messages: arrayOf(arrayOf(string)),
  }),
};

export default SideMessage;
