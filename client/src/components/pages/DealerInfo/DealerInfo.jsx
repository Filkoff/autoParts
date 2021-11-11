import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AuthorizationModal from '../../Modal/ModalWindow';
import { setCurrentPerson } from '../../../reducers/chatReducer';
import styles from './DealerInfo.module.scss';

function DealerInfo() {
  const currentDealer = useSelector((state) => state.dealer.choosenDealer);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isAuth = useSelector((state) => state.user.isAuth);

  const nextButton = (
    <NavLink to={`/chat/${currentDealer.id}`}>
      <Button
        className={styles.button}
        variant="contained"
        color="primary"
        onClick={() =>
          dispatch(setCurrentPerson(currentDealer.id, currentDealer.name))
        }
      >
        {t('contact')}
      </Button>
    </NavLink>
  );

  const registerButton = (
    <Button
      className={styles.button}
      variant="contained"
      color="primary"
      onClick={() => setIsVisible(true)}
    >
      {t('contact')}
    </Button>
  );

  return (
    <div className={styles.container}>
      <h1>{t('dealerInfo')}</h1>
      <img
        className={styles.image}
        src="/assets/images/avatar.jpg"
        alt="logo"
      />
      <p>
        {t('name')}: {currentDealer.name}
      </p>
      <p>
        {t('address')}: {currentDealer.address}
      </p>
      {isAuth ? nextButton : registerButton}
      <AuthorizationModal show={isVisible} setShow={setIsVisible}>
        <h3 className={styles.header}>{t('registrationRequest')}</h3>
        <NavLink to="/login">
          <Button className={styles.button} variant="contained" color="primary">
            {t('login.logIn')}
          </Button>
        </NavLink>
        <NavLink to="/registration">
          <Button className={styles.button} variant="contained" color="primary">
            {t('login.registr')}
          </Button>
        </NavLink>
      </AuthorizationModal>
    </div>
  );
}

export default DealerInfo;
