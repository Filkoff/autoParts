import React from 'react';
import { useTranslation } from 'react-i18next';
import { shape, string, number, element } from 'prop-types';
import styles from './OrderItem.module.scss';

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
  item: shape({
    name: string,
    description: string,
    price: number,
    amount: number,
    img: string,
  }),
  children: element,
};

export default OrderItem;
