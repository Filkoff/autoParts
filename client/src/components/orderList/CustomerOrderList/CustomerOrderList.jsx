import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Order from '../Order/Order';
import styles from './CustomerOrderList.module.scss';

function CustomerOrderList() {
  const { t } = useTranslation();
  const orders = useSelector((state) => state.customer.orders);
  return (
    <div className={styles.container}>
      <h2>{t('yourOrders')}</h2>
      <div className={styles.orders} id="orders">
        {orders.map((item) => (
          <Order key={item.orderId} order={item} />
        ))}
      </div>
    </div>
  );
}

export default CustomerOrderList;
