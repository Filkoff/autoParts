import React from 'react';
import OrderItem from '../OrderItem/OrderItem';
import styles from './Order.module.scss';
import { useTranslation } from 'react-i18next';

function Order({ order, children }) {
  const { t } = useTranslation();
  return (
    <div key={order.orderId} className={styles.order}>
      <div className={styles.orderBlock}>
        <div className={styles.mainInfo}>
          <h3>
            {t('order')} #{order.orderId}
          </h3>
          <p>{order.date}</p>
          <p>{order.address}</p>
          <p>
            {t('paymentMethod')}: {order.paymentType}
          </p>
          {children}
          <p>
            <b>
              {t('total')}: {order.total}р.
            </b>
          </p>
        </div>
        <div className={styles.items}>
          {order.orders.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
