import React from 'react';
import { useTranslation } from 'react-i18next';
import { shape, arrayOf, string, number, element } from 'prop-types';
import OrderItem from '../OrderItem/OrderItem';
import styles from './Order.module.scss';

function Order({ order, children }) {
  const { t } = useTranslation();
  return (
    <div id="order" className={styles.order}>
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
              {t('total')}: {order.total}
              {t('currency')}
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

Order.propTypes = {
  order: shape({
    orderId: string,
    date: string,
    address: string,
    paymentType: string,
    total: number,
    orders: arrayOf(shape({ id: string })),
  }),
  children: arrayOf(element),
};

export default Order;
