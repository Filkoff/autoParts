import React from 'react';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import styles from './ModalLogin.module.scss';
import { useTranslation } from 'react-i18next';

function ModalLogin() {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>{t('askToLogin')}</h3>
        <div>
          <NavLink to="/login">
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
            >
              {t('login.logIn')}
            </Button>
          </NavLink>
          <NavLink to="/registration">
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
            >
              {t('login.registr')}
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ModalLogin;
