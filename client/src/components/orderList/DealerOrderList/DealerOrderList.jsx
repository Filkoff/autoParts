import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Order from '../Order/Order';
import styles from './DealerOrderList.module.scss';

function DealerOrderList() {
  const { t } = useTranslation();
  const orders = useSelector((state) => state.dealer.orders);
  return (
    <div className={styles.container}>
      <h2>{t('yourOrders')}</h2>
      {orders.map((item) => (
        <Order key={item.orderId} order={item}>
          <p>
            {t('phone')}: {item.phoneNumber}
          </p>
          <p>
            {t('customer')}: {item.name}
          </p>
        </Order>
      ))}
    </div>
  );
}

export default DealerOrderList;
