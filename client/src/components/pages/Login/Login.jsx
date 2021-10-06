import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Container,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { login } from '../../../actions/user';
import styles from './Login.module.scss';
import { useTranslation } from 'react-i18next';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <img src="/assets/images/Lada.png" alt="logo" />
      <div>
        <Container maxWidth="xs">
          <DialogTitle id="form-dialog-title" fontSize="large">
            {t('login.logIn')}
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
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
              label="Введите пароль"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>

          <NavLink to={'/main'}>
            <Button
              id="login"
              className={styles.button}
              onClick={() => dispatch(login(email, password))}
              variant="contained"
              color="primary"
            >
              {t('login.logIn')}
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
      </div>
      <div>
        <p>{t('notRegistr')}</p>
        <NavLink to="/registration" className={styles.registerLink}>
          <Button
            className={styles.button}
            variant="outlined"
            color="secondary"
          >
            {t('login.registr')}
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
