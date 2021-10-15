import React from 'react';
import styles from './OrderItem.module.scss';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function OrderItem({ item, children }) {
  const { t } = useTranslation();

  return (
    <div className={styles.item}>
      <div className={styles.itemInfo}>
        <p className={styles.name}>{item.name}</p>
        <p>{item.description}</p>
        <p>
          {t('price')}: {item.price}
          {t('currency')}
        </p>
        <p>
          {t('amount')}: {item.amount}
        </p>
        <div>{children}</div>
      </div>
      <div>
        <img src={item.img} alt={item.name} className={styles.image} />
      </div>
    </div>
  );
}

OrderItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
    img: PropTypes.string,
  }),
  children: PropTypes.element,
};

export default OrderItem;
