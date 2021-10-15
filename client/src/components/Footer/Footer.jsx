import React from 'react';
import { Typography } from '@material-ui/core';
import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.footerInfo}>
          {t('support')}: <a href="tel:+375299999999">+375 (29) 999-99-99</a>
        </div>
        <div>
          <Typography variant="body1" color="inherit">
            © 2021 AutoParts
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Footer;
