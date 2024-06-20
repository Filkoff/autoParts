import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Container,
} from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../../../actions/user';
import useEmailValidation from '../../../customHooks/useEmailValidation';
import styles from './Login.module.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isEmailCorrect, errorText] = useEmailValidation(email);
  const [isInputChanged, setIsInputChanged] = useState(false);
  const router = useHistory();
  const handleBlur = () => {
    setIsInputChanged(true);
  };

  const loginHandler = () => {
    if (isEmailCorrect) {
      router.push('/main');
      dispatch(login(email, password));
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src="/assets/images/Lada.png" alt="logo" />
      <div>
        <Container maxWidth="xs">
          <DialogTitle id="form-dialog-title" fontSize="large">
            {t('login.logIn')}
          </DialogTitle>
          <DialogContent>
            <TextField
              error={!isEmailCorrect && isInputChanged ? !isEmailCorrect : null}
              helperText={!isEmailCorrect && isInputChanged ? errorText : ''}
              required
              autoFocus
              margin="dense"
              id="email"
              label={t('yourEmail')}
              type="email"
              fullWidth
              value={email}
              onBlur={handleBlur}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="password"
              label={t('enterPassword')}
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>

          <Button
            id="login"
            className={styles.button}
            onClick={loginHandler}
            variant="contained"
            color="primary"
          >
            {t('login.logIn')}
          </Button>

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
