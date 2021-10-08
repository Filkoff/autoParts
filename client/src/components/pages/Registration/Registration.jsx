import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Container,
  NativeSelect,
  InputLabel,
} from '@material-ui/core';
import { registration } from '../../../actions/user';
import { NavLink } from 'react-router-dom';
import styles from './Registration.module.scss';
import { useTranslation } from 'react-i18next';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('customer');
  const [name, setName] = useState('');
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <img src="/assets/images/Lada.png" alt="logo" />
      <>
        <Container maxWidth="xs">
          <DialogTitle id="form-dialog-title">{t('login.registr')}</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="Имя/логин"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="email"
              label="Ваш email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="password"
              label="Пароль"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.flexContainer}>
              <InputLabel>{t('registerAs')}</InputLabel>
              <NativeSelect id="type" onChange={(e) => setType(e.target.value)}>
                <option value="customer">{t('customer')}</option>
                <option value="dealer">{t('dealer')}</option>
              </NativeSelect>
            </div>
          </DialogContent>
          <NavLink to={'/main'}>
            <Button
              id="registrationButton"
              className={styles.button}
              onClick={() => registration(name, email, password, type)}
              variant="contained"
              color="primary"
            >
              {t('register')}
            </Button>
          </NavLink>
          <NavLink to={'/'}>
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
            >
              {t('cancel')}
            </Button>
          </NavLink>
        </Container>
      </>
    </div>
  );
};

export default Registration;
