import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

function Footer() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.footerInfo}>
        {t('support')}: <a href="tel:+375299999999">+375 (29) 999-99-99</a>
      </div>
      <div>© 2021 AutoParts</div>
    </div>
  );
}

export default Footer;
