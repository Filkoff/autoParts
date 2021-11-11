import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import { addMessage } from '../../../reducers/chatReducer';
import styles from './Input.module.scss';

function Input() {
  const [message, setMessage] = useState('');
  const person = useSelector((state) => state.chat.currentPerson);
  const dispatch = useDispatch();
  const now = new Date().toLocaleString();
  const newMessage = [DOMPurify.sanitize(message), now, 'userMessage'];
  return (
    <div className={styles.container}>
      {person.name ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (message) {
              dispatch(addMessage(person.id, person.name, newMessage));
              setMessage('');
            }
          }}
        >
          <div className={styles.inputContainer}>
            <TextField
              className={styles.input}
              multiline
              maxRows={20}
              variant="outlined"
              maxLength="1000"
              type="text"
              size="small"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <Button
              variant="contained"
              className={styles.button}
              color="primary"
              type="submit"
              size="small"
            >
              <SendIcon fontSize="small" />
            </Button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

export default Input;
