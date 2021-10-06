import React from 'react';
import 'fontsource-roboto';
import { Toolbar, AppBar, Button, NativeSelect } from '@material-ui/core';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeaderNav from '../Header-nav/HeaderNav';

const Header = () => {
  const { t, i18n } = useTranslation();
  const isAuth = useSelector((state) => state.user.isAuth);
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <div>
      <AppBar className={styles.header}>
        <Toolbar>
          <div className={styles.mainContainer}>
            <NavLink to={'/main'}>
              <div
                className={styles.logo}
                style={{ color: '#000' }}
                variant="h6"
              >
                {t('title')}
              </div>
            </NavLink>

            {!isAuth && (
              <NavLink to="/login">
                <Button className={styles.headerButton} variant="outlined">
                  {t('login.logIn')}
                </Button>
              </NavLink>
            )}
            {isAuth && <HeaderNav />}
          </div>
          <div className={styles.lang}>
            <NativeSelect
              variant="standard"
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value={'ru'}>RU</option>
              <option value={'en'}>EN</option>
            </NativeSelect>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
