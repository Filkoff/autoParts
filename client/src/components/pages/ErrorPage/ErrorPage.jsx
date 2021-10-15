import React from 'react';
import styles from './ErrorPage.module.scss';
import { useTranslation } from 'react-i18next';

function ErrorPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h2>{t('pageNotFound')}</h2>
      <p>{t('urlError')}</p>
      <img src="/assets/images/broken.png" alt="broken" />
    </div>
  );
}

export default ErrorPage;
