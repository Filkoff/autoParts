import React from 'react';
import { Toolbar, AppBar, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeaderNav from '../Header-nav/HeaderNav';
import MySelect from '../../reusable/MySelect';
import styles from './Header.module.scss';

const Header = () => {
  const { t, i18n } = useTranslation();
  const isAuth = useSelector((state) => state.user.isAuth);
  const router = useHistory();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <AppBar className={styles.header}>
        <Toolbar>
          <div className={styles.mainContainer}>
            <NavLink to={'/main'}>
              <div className={styles.logo}>{t('title')}</div>
            </NavLink>

            {!isAuth && (
              <Button
                size="small"
                onClick={() => router.push('/login')}
                className={styles.headerButton}
                variant="outlined"
              >
                {t('login.logIn')}
              </Button>
            )}
            {isAuth && <HeaderNav />}
          </div>
          <div className={styles.lang}>
            {/* <NativeSelect
              value={i18n.language}
              size="small"
              variant="standard"
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value={'ru'}>RU</option>
              <option value={'en'}>EN</option>
            </NativeSelect> */}
            <MySelect
              value={i18n.language}
              size="small"
              variant="standard"
              onChange={changeLanguage}
              options={[
                { value: 'ru', name: 'RU' },
                { value: 'en', name: 'EN' },
              ]}
            />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
