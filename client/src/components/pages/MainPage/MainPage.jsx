import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Header from '../../header/Header/Header';
import Search from '../../Search/Search';
import 'fontsource-roboto';
import styles from './MainPage.module.scss';

const MainPage = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className={styles.mainBackground}>
      <Header />
      <div className={styles.block}>
        <div>
          <h2 className={styles.heading}>{t('mainHeader')}</h2>
        </div>
        <div>
          <img
            className={styles.image}
            src="/assets/images/vesta2.png"
            alt="vesta"
          />
        </div>
      </div>
      {currentUser.type === 'dealer' ? null : <Search />}
      <div className={styles.mainContent}>
        <div>
          <h1 className={styles.contentHeading}>{t('header')}</h1>
          <div className={styles.text}>
            <p>{t('mainText1')}</p>
            <p>{t('mainText2')}</p>

            <img
              src="/assets/images/2101.jpg"
              alt="auto"
              className={styles.textImage}
            />

            <p>{t('mainText3')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
