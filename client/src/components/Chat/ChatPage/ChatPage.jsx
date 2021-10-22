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
  const chat = chats.find((item) => item.id === id);
  if (chat) {
    dispatch(setCurrentPerson(chat.id, chat.person));
  }
  return (
    <div className={styles.container}>
      <SideChat chats={chats} />
      <div className={styles.messagesContainer}>
        <MessagesHeader />
        <div className={styles.messages}>
          <MessagesContainer chats={chats} chat={chat} />
          <Input />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
