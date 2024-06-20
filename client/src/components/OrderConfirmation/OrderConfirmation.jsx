import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import styles from './OrderConfirmation.module.scss';

function OrderConfirmation() {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 id="successOrderMessage" className={styles.header}>
          {t('successOrdered')}
        </h2>
        <NavLink to="/user/orders">
          <Button className={styles.button} variant="outlined">
            {t('goToOrders')}
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

export default OrderConfirmation;
