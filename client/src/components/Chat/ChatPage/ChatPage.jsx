import React from 'react';
import MessagesContainer from '../MessagesContainer/MessagesContainer';
import Input from '../Input/Input';
import SideChat from '../SideChat/SideChat';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setCurrentPerson } from '../../../reducers/chatReducer';
import styles from './ChatPage.module.scss';
import MessagesHeader from '../MessagesHeader/MessagesHeader';

function ChatPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const chats = useSelector((state) => state.chat.chats);
  const person = chats.find((item) => item.id === id);
  if (person) {
    dispatch(setCurrentPerson(person.id, person.person));
  }
  return (
    <div className={styles.container}>
      <SideChat />
      <div className={styles.messagesContainer}>
        <MessagesHeader />
        <div className={styles.messages}>
          <MessagesContainer />
          <Input />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
