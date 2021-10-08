import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { setCurrentPerson } from '../../../reducers/chatReducer';
import { useDispatch, useSelector } from 'react-redux';
import styles from './DealerInfo.module.scss';
import { useTranslation } from 'react-i18next';
import Modal from '../../Modal/Modal';

function DealerInfo() {
  const currentDealer = useSelector((state) => state.dealer.choosenDealer);
  const [show, setShow] = useState(false);
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
      onClick={() => setShow(true)}
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
      <Modal show={show} setShow={setShow}>
        <h3 className={styles.header}>
          Чтобы продолжить, войдите в аккаунт или зарегистрируйтесь
        </h3>
        <NavLink to="/login">
          <Button
            className={styles.button}
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            {t('login.logIn')}
          </Button>
        </NavLink>
        <NavLink to="/registration">
          <Button className={styles.button} variant="contained" color="primary">
            {t('login.registr')}
          </Button>
        </NavLink>
      </Modal>
    </div>
  );
}

export default DealerInfo;
