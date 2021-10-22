import React from 'react';
import OrderItem from '../OrderItem/OrderItem';
import styles from './Order.module.scss';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

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
  order: PropTypes.shape({
    orderId: PropTypes.string,
    date: PropTypes.string,
    address: PropTypes.string,
    paymentType: PropTypes.string,
    total: PropTypes.number,
    orders: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
  }),
  children: PropTypes.arrayOf(PropTypes.element),
};

export default Order;
