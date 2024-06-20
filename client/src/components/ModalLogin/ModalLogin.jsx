import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';
import { Button } from '@material-ui/core';
import styles from './ModalLogin.module.scss';

function ModalLogin({ setIsModalShown }) {
  const { t } = useTranslation();
  return (
    <div className={styles.container} onClick={() => setIsModalShown(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
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

ModalLogin.propTypes = {
  setIsModalShown: func,
};

export default ModalLogin;
